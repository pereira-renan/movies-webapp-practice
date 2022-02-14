import Link from "next/link"
import styles from "./MoviesList.module.scss"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useState } from "react"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.

export default function FavoriteMovies({ selectedFavorite }) {
  const [favorites, setFavorites] = useState([])
  function showFavorites(selectedFavorite) {
    let newFavorite = selectedFavorite.current
    setFavorites((favorites) => [...favorites, newFavorite])
    console.log(favorites)
  }

  return (
    <div className={styles.movie}>
      <p>asdasd</p>
      <button type="input" onClick={() => showFavorites(selectedFavorite)}>
        show favorites
      </button>

      {favorites?.map((favorite, i) => (
        <>{favorite.title}</>
      ))}
    </div>
  )
}
