import Link from "next/link"
import styles from "./MoviesList.module.scss"
import { Image } from "@chakra-ui/react"
import { BsHeart, BsHeartFill } from "react-icons/bs"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function MoviesList({ movie }) {
  function moviePosterSrc() {
    let srcPath = "https://image.tmdb.org/t/p/w200/" + movie.poster_path
    //let srcPath = "https://image.tmdb.org/t/p/w300/" + movie.poster_path
    return srcPath
  }
  const heartSize = "30px"
  return (
    <div className={styles.movie}>
      <div className={styles.poster}>
        <img src={moviePosterSrc()}></img>
      </div>
      <div className={styles.text}>{movie.original_title}</div>
      <div className={styles.text}>{movie.release_date.split("-")[0]}</div>
      <div className={styles.favorite}>
        <BsHeartFill color="grey" size={heartSize} />
      </div>
      <div className={styles.favorite} onClick={() => console.log("click")}>
        <a>
          <BsHeart size={heartSize} />
        </a>
      </div>
    </div>
  )
}
