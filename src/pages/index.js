import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import MoviesList from "../components/MoviesList"
import Header from "../components/header"
import { useSession } from "next-auth/react"
import FavoriteMovies from "../components/FavoriteMovies"
import { Grid, GridItem } from "@chakra-ui/react"

export default function Home({ movies, favorites }) {
  const { data: session, status } = useSession()
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <div class="search">
          <input type="text" class="searchTerm" placeholder="Search"></input>
          <button type="submit" class="searchButton">
            <i class="fa fa-search"></i>
          </button>
        </div>
        <h1 className={styles.appTitle}>Welcome to Movie Mania!</h1>
        <div className={styles.list}>
          <Grid
            justifyItems="center"
            templateColumns="repeat(5, 0.2fr)"
            gap={6}
          >
            {movies.map((movie, i) => (
              <MoviesList movie={movie} key={i} />
            ))}
          </Grid>
        </div>
        {session ? (
          <>
            <h1>Your Favorites</h1>
            {favorites.map((favorite, i) => (
              <FavoriteMovies favorite={favorite} key={i} />
            ))}
          </>
        ) : (
          <>
            <h1>Your Favorites</h1>
            <h2>You are not logged in.</h2>
          </>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  // request movies from api
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=8353351ab4cc562ce1cfced2e08dfd66`,
    {
      method: "GET",
    }
  )

  let addedFavorites = await fetch(`http://localhost:3000/api/favorites`, {
    method: "GET",
  })

  // extract the data
  let data = await response.json()
  let dataFavorites = await addedFavorites.json()

  return {
    props: {
      movies: data.results,
      favorites: dataFavorites.message,
    },
  }
}
