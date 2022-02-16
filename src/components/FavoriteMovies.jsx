import styles from "./MoviesList.module.scss"
import { useContext } from "react"
import { MoviesContext } from "../pages/context"
import { FaHeartBroken, FaHeart } from "react-icons/fa"
import { BsHeart, BsHeartFill, BsInfoCircleFill } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

export default function FavoriteMovies({ favorite, removeFavorite }) {
  const { favorites, setFavorites } = useContext(MoviesContext)
  const { viewDetails, setViewDetails } = useContext(MoviesContext)
  const { details, setDetails } = useContext(MoviesContext)
  const iconSize = "20px"

  function showMovieDetails(favorite) {
    setViewDetails(true)
    setDetails(favorite)
  }

  return (
    <div className={styles.movie}>
      <div className={styles.movieHeader}>
        <div
          className={styles.favorite}
          onClick={() => removeFavorite(favorite)}
        >
          <FaHeart
            size={iconSize}
            color="red"
            className={styles.removeFavorite}
          />
          <FaHeartBroken size={iconSize} className={styles.addFavorite} />
        </div>
        <div
          className={styles.movieDetails}
          onClick={() => showMovieDetails(favorite)}
        >
          <BsInfoCircleFill size={iconSize} />
        </div>
      </div>
      <div className={styles.movieBody}>
        <img
          className={styles.poster}
          src={"https://image.tmdb.org/t/p/w500/" + favorite.poster_path}
        ></img>
      </div>
      <div className={styles.movieFooter}>
        <div className={styles.starRating}>
          <AiFillStar />
          <div className={styles.voteAverage__text}>
            {favorite.vote_average}
          </div>
        </div>
        <div className={styles.text}>{favorite.original_title}</div>
        <div className={styles.text}>{favorite.release_date.split("-")[0]}</div>
      </div>
    </div>
  )
}
