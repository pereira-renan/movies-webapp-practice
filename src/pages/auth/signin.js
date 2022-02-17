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
      <div className={styles.loginBox__body}>
        <div className={styles.loginBox__container}>
          <form method="post" action="/api/auth/signin/email">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label>
              <div className={styles.loginBox__text}>Log In</div>
              <input
                className={styles.loginBox__input}
                type="text"
                id="email"
                name="email"
                placeholder="your email here"
              />
            </label>
            <button type="submit" className="buttonPrimary">
              Sign in
            </button>
          </form>
          <div className={styles.loginBox__line} />

          {Object.values(providers).map((provider) => {
            if (provider.name === "Email") {
              return
            }
            return (
              <>
                <div key={provider.name}>
                  <button
                    type="input"
                    className="buttonPrimary"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              </>
            )
          })}
        </div>
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
