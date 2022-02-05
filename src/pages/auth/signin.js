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
import styles from "../../styles/Home.module.css"

export default function SignIn({ providers, csrfToken }) {
  return (
    <Layout>
      <Container maxW="xl" centerContent>
        <Heading color="white" as="h1" textAlign="center">
          Welcome to your Movie Mania page!
        </Heading>
        <Box
          textAlign="center"
          alignContent="center"
          justifyContent="center"
          marginTop={12}
        >
          <Box className="email-form">
            <form method="post" action="/api/auth/signin/email">
              <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <label>
                <div color="white">Log in using your address</div>
                <br />
                <Input type="text" id="email" name="email" />
              </label>
              <Button type="submit">Sign in</Button>
            </form>
          </Box>
          <Stack justifyContent="center" isInline marginTop={12}>
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
                    <Button
                      variant="outline"
                      onClick={() => signIn(provider.id)}
                    >
                      Sign in with {provider.name}
                    </Button>
                  </Box>
                </>
              )
            })}
          </Stack>
        </Box>
      </Container>
    </Layout>
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
