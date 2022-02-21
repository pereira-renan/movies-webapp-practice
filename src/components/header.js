import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.scss"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header>
      <div className={styles.navBar}>
        {session ? (
          <>
            <Link href="/">
              <a>
                <div className={styles.logo__container}>
                  <div className={styles.logo__text}>
                    Welcome to the Popcorn Factory, Renan!
                  </div>
                  <div className={styles.logo__img}></div>
                </div>
              </a>
            </Link>
          </>
        ) : (
          <Link href="/">
            <a>
              <div className={styles.logo__container}>
                <div className={styles.logo__text}>Popcorn </div>
                <div className={styles.logo__img}></div>
                <div className={styles.logo__text}>Factory</div>
              </div>
            </a>
          </Link>
        )}
        <div className={styles.navLinks}>
          {session ? (
            <>
              <Link href="">
                <button className="buttonPrimary" onClick={() => signOut()}>
                  Sign Out
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <button
                  className="buttonPrimary"
                  onClick={(e) => {
                    e.preventDefault()
                    signIn()
                  }}
                >
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
