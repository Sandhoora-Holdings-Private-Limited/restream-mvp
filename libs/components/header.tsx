import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import { useRouter } from 'next/router'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <header className="container">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        {/* <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              /* <span className={styles.notSignedInText}>
                You are not signed in
              </span> 
               <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>  */}
              <div className="row">
                <div className="col">
                  <div style={{float:"right"}} className="mt-2">
                  <a href={"#"} >

                    <div className="row">
                      <div className="col">
                          <span
                          style={{ backgroundColor: "#ccc" }}
                          className={styles.avatar}
                        />
                      </div>
                      <div className="col" style={{ minWidth : "7em" }}>
                      <span >
                        <small>Signed in as</small>
                        <br />
                        <strong>John Doe</strong>
                      </span>

                      </div>

                    </div>
                    </a>
                  </div>
                  <div style={{float:"left"}} className="mt-2">
                    {!(router.asPath == "/") &&
                      <Link href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                          <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
                        </svg>
                        </Link>
                    }
                  </div>
                </div>
              </div>
              
{/* 
            </>
          )}
          {session?.user && (
            <>
            <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
              
              <span
                style={{ backgroundImage: `url(${session.user.image})` }}
                className={styles.avatar}
              />
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.name || session.user.email}</strong>
              </span>
              
            </>
          )}
        </p> */}
      </div>
    </header>
  )
}
