import styles from "./MovieDetails.module.scss"
import { useSession } from "next-auth/react"
import { BiArrowBack, BiHeart } from "react-icons/bi"

export default function MovieDetails({ movie, setViewDetails }) {
  const { data: session } = useSession()
  const heartSize = "30px"
  return (
    <div className={styles.movie}>
      <div className={styles.poster}>
        <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}></img>
      </div>
      <div className={styles.movieDetails__div}>
        <div className={styles.heading}>Title</div>
        <div className={styles.text}>
          {movie.title} ({movie.release_date.split("-")[0]})
        </div>
        <br />
        <div className={styles.heading}>Oveview</div>
        <div className={styles.text}>{movie.overview}</div>
        <br />
        <div className={styles.detailsFooter}>
          <div>
            <div className={styles.heading}>Release Date</div>
            <div className={styles.text}>{movie.release_date}</div>
            <br />

            <div className={styles.heading}>Genre</div>
            <div className={styles.text}>
              {movie.genre_ids?.map((genre, i) => (
                <>
                  {genre} <br />
                </>
              ))}
            </div>
            <br />
          </div>
          <div className={styles.rightBottom}>
            <div className={styles.heading}>Vote Average</div>
            <div className={styles.stars}>
              Some kind of function to show stars here ({movie.vote_average})
            </div>
            <br />
            <div className={styles.icons}>
              <div onClick={() => setViewDetails(false)}>
                <BiArrowBack size="50px" className={styles.backArrowIcon} />
              </div>

              {session && (
                <>
                  <div onClick={() => console.log("heart")}>
                    <BiHeart size="50px" className={styles.likeIcon} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
