import React from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "../../components/layout"
import { getProviders, signIn, getSession, getCsrfToken } from "next-auth/react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Container,
  Stack,
} from "@chakra-ui/react"
import styles from "../../styles/SignIn.module.scss"
import Header from "../../components/header"

export default function SignIn({ providers, csrfToken }) {
  return (
    <div className={styles.page__container}>
      <Header />
      <div className="appTitle">
        <h1>Welcome to your Movie Mania page!</h1>
      </div>
      <div>
        <form method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            <div color="white">Log in using your address</div>
            <br />
            <input type="text" id="email" name="email" />
          </label>
          <button type="submit" className="buttonPrimary">
            Sign in
          </button>
        </form>
        {Object.values(providers).map((provider) => {
          if (provider.name === "Email") {
            return
          }
          return (
            <>
              <label>
                <div color="white">
                  or login with your social media
                  <br />
                </div>
              </label>
              <Box key={provider.name}>
                <Button variant="outline" onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </Button>
              </Box>
            </>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }
  return {
    props: {
      session: session,
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    },
  }
}
