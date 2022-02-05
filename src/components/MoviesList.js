import Link from "next/link"
import styles from "./MoviesList.module.scss"
import { Image } from "@chakra-ui/react"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { AiFillStar } from "react-icons/ai"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

const addFavorite = async (movieId) => {
  // change publishing state

  try {
    // Update post
    await fetch(`/api/${movieId}`, {
      method: "POST",
    })

    // reload the page
    return router.reload()
  } catch (error) {
    // Stop publishing state
    return console.log("error")
  }
}

export default function MoviesList({ movie }) {
  const { data: session, status } = useSession()
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
      <Popover>
        <PopoverTrigger>
          <Button>Details</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to have that milkshake?
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <div className={styles.text}>{movie.original_title}</div>
      <div className={styles.text}>{movie.release_date.split("-")[0]}</div>
      <div className={styles.stars}>
        <AiFillStar color="orange" /> {movie.vote_average}
      </div>
      {session && (
        <>
          <div className={styles.favorite}>
            <BsHeartFill color="grey" size={heartSize} />
          </div>
          <div
            className={styles.favorite}
            onClick={() => addFavorite(movie["id"])}
          >
            <a>
              <BsHeart size={heartSize} />
            </a>
          </div>
        </>
      )}
    </div>
  )
}
