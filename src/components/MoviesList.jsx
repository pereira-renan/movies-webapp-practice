import Link from "next/link"
import styles from "./MoviesList.module.scss"
import { Image } from "@chakra-ui/react"
import { BsHeart, BsHeartFill, BsInfoCircleFill } from "react-icons/bs"
import { useSession } from "next-auth/react"
import { AiFillStar } from "react-icons/ai"
import { FaHeartBroken, FaHeart } from "react-icons/fa"
import { useEffect, useRef, useState } from "react"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

export default function MoviesList({ movie, showMovieDetails, addFavorite }) {
  const { data: session, status } = useSession()

  const iconSize = "20px"
  return (
    <div className={styles.movie}>
      <div className={styles.movieHeader}>
        {session ? (
          <>
            <div className={styles.favorite} onClick={() => addFavorite(movie)}>
              <FaHeart size={iconSize} className={styles.addFavorite} />
              <FaHeartBroken
                size={iconSize}
                className={styles.removeFavorite}
              />
            </div>
            <div
              className={styles.movieDetails}
              onClick={() => showMovieDetails(movie)}
            >
              <BsInfoCircleFill size={iconSize} />
            </div>
          </>
        ) : (
          <>
            <div
              className={styles.movieDetails}
              onClick={() => showMovieDetails(movie)}
            >
              <BsInfoCircleFill size={iconSize} />
            </div>
          </>
        )}
      </div>
      <div className={styles.movieBody}>
        <img
          className={styles.poster}
          src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        ></img>
      </div>
      <div className={styles.movieFooter}>
        <div className={styles.starRating}>
          <AiFillStar />
          <div className={styles.voteAverage__text}>{movie.vote_average}</div>
        </div>
        <div className={styles.text}>{movie.original_title}</div>
        <div className={styles.text}>{movie.release_date.split("-")[0]}</div>
      </div>
    </div>
  )
}
