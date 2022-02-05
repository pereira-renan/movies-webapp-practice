import Link from "next/link"
import styles from "./MoviesList.module.scss"
import { BsHeart, BsHeartFill } from "react-icons/bs"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

async function removeFavorite(favorite) {
  try {
    console.log(favorite)
    // Update post
    await fetch(`http://localhost:/api/${favorite}`, {
      method: "DELETE",
    })

    // reload the page
    return router.push(router.asPath)
  } catch (error) {
    // Stop publishing state
    return console.log("error")
  }
}
export default function FavoriteMovies({ favorite }) {
  const heartSize = "30px"
  return (
    <div className={styles.movie}>
      <div>{favorite}</div>
      <div className={styles.poster}>
        <img src=""></img>
      </div>
      <div className={styles.favorite}>
        <BsHeartFill color="grey" size={heartSize} />
      </div>
      <div className={styles.favorite} onClick={() => removeFavorite(favorite)}>
        <a>
          <BsHeart size={heartSize} />
        </a>
      </div>
    </div>
  )
}
