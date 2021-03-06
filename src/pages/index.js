import Head from "next/head"
import styles from "../styles/Home.module.css"
import MoviesList from "../components/MoviesList"
import Header from "../components/header"
import { useSession, getSession } from "next-auth/react"
import FavoriteMovies from "../components/FavoriteMovies"
import { Grid, GridItem } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import MovieDetails from "../components/MovieDetails"
import { MoviesContext, MoviesProvider } from "../lib/context"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { FadeLoader } from "react-spinners"
import { AiFillSave } from "react-icons/ai"
import { FcCheckmark } from "react-icons/fc"

const queryClient = new QueryClient()

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Home({ movies }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MoviesProvider>
        <HomeContent movies={movies} />
      </MoviesProvider>
    </QueryClientProvider>
  )
}

function HomeContent({ movies }) {
  const { viewDetails, setViewDetails } = useContext(MoviesContext)
  const { details, setDetails } = useContext(MoviesContext)
  const selectedFavorite = useContext(MoviesContext)
  const { favorites, setFavorites } = useContext(MoviesContext)
  const { data: session } = useSession()
  const { catalog, setCatalog } = useContext(MoviesContext)
  const { filter, setFilter } = useContext(MoviesContext)
  const { loading, setLoading } = useContext(MoviesContext)
  const { updating, setUpdating } = useContext(MoviesContext)

  async function updateFavorites(favorites) {
    setUpdating(2)
    await delay(2000)
    let userSession = await getSession()
    let email = userSession.user.email

    await fetch(`/api/favorites`, {
      method: "POST",
      body: JSON.stringify({ email, favorites }),
    })

    setUpdating(3)
    await delay(2000)

    setUpdating(0)
  }

  async function movieDataSetup() {
    setLoading(true)
    setCatalog(movies)
    let userSession = await getSession()
    if (userSession) {
      let response = await fetch(`/api/favorites`, {
        method: "GET",
        //prettier-ignore
        headers: {
        "email": userSession.user.email,
      },
      })
      let data = await response.json()
      setFavorites(data.userFavorites)

      const favoritesIDs = new Set(data.userFavorites.map(({ id }) => id))
      const cleanCatalog = [...movies.filter(({ id }) => !favoritesIDs.has(id))]
      setCatalog(cleanCatalog)
    }
    setLoading(false)
  }

  useEffect(() => {
    movieDataSetup()
  }, [])

  function handleAddFavorites(selectedFavorite) {
    setUpdating(1)
    const myFavoritesId = favorites.map((favorites) => favorites.id)
    if (
      !myFavoritesId.includes(selectedFavorite.id) ||
      myFavoritesId.length == 0
    ) {
      let updatedCatalog = catalog.filter(
        (catalog) => catalog.id != selectedFavorite.id
      )
      setCatalog(updatedCatalog)
      setFavorites((favorites) => [...favorites, selectedFavorite])
    }
  }

  function handleRemoveFavorites(selectedFavorite) {
    setUpdating(1)
    let updatedFavorites = favorites.filter(
      (favorites) => favorites.id != selectedFavorite.id
    )
    let updatedCatalog = catalog
    updatedCatalog.push(selectedFavorite)
    setCatalog(updatedCatalog)
    setFavorites(updatedFavorites)
  }

  function handleDetails(movieDetails) {
    setViewDetails(true)
    setDetails(movieDetails)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Popcorn Factory!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        {loading ? (
          <FadeLoader
            css={"position: absolute; top: 50%; left: 50%"}
            color="white"
          />
        ) : (
          <>
            {viewDetails ? (
              <MovieDetails
                key="movieDetails"
                movie={details}
                setViewDetails={setViewDetails}
              />
            ) : (
              <>
                <div className={styles.appBar}>
                  <p style={{ textAlign: "center" }}>
                    Get your popcorn and find a movie on the list below to learn
                    more about!
                    <br /> Also, if you login, you can pick your favorite movies
                    to remember what to watch later, pretty cool right?
                  </p>
                </div>
                <div className={styles.searchBar}>
                  <input
                    className={styles.searchBar__input}
                    id="filter"
                    name="filter"
                    type="text"
                    value={filter}
                    placeholder="start typing here to search for something AWESOME"
                    onChange={(event) => setFilter(event.target.value)}
                  />
                </div>
                {catalog.length == 0 ? (
                  <div className={styles.centerMessage}>
                    <h3>
                      Oops,
                      <br /> Looks like we ran out of movies!
                      <br /> Why don't you try watching some of your favorites?
                    </h3>
                  </div>
                ) : (
                  <div className={styles.list}>
                    <Grid
                      justifyItems="center"
                      templateColumns="repeat(6, 10rem)"
                      gap={100}
                    >
                      {catalog
                        ?.filter(
                          (movie) =>
                            movie.title
                              .toLowerCase()
                              .includes(filter.toLowerCase()) || filter === ""
                        )
                        .map((movie, i) => (
                          <MoviesList
                            movie={movie}
                            key={i}
                            addFavorite={(newFavorite) =>
                              handleAddFavorites(newFavorite)
                            }
                            showMovieDetails={(movieDetails) =>
                              handleDetails(movieDetails)
                            }
                          />
                        ))}
                    </Grid>
                  </div>
                )}
                {session && (
                  <>
                    <div>
                      <h1>
                        <div className="flexRow__div">
                          <div className={styles.favoritesText__div}>
                            Your Favorites ({favorites.length})
                          </div>
                          <div className={styles.favoritesButton__div}>
                            {updating == 1 && (
                              <div className={styles.favoritesButton__div}>
                                <AiFillSave
                                  size={"40px"}
                                  onClick={() => {
                                    updateFavorites(favorites)
                                  }}
                                />
                              </div>
                            )}
                            {updating == 2 && (
                              <div className={styles.favoritesButton__div}>
                                <FadeLoader size={"80px"} color="white" />
                              </div>
                            )}
                            {updating == 3 && (
                              <div className={styles.favoritesButton__div}>
                                <FcCheckmark size={"80px"} color="white" />
                              </div>
                            )}

                            {updating ? <></> : <></>}
                          </div>
                        </div>
                      </h1>
                    </div>
                    {favorites.length == 0 ? (
                      <div className={styles.centerMessage}>
                        <h3>
                          Try pressing the heart button to add a movie as
                          favorite, remember to save before leaving!
                        </h3>
                      </div>
                    ) : (
                      <div className={styles.list}>
                        <Grid
                          justifyItems="center"
                          templateColumns="repeat(6, 10rem)"
                          gap={100}
                        >
                          {favorites?.map((favorite, i) => (
                            <FavoriteMovies
                              favorite={favorite}
                              key={i}
                              removeFavorite={(newFavorite) =>
                                handleRemoveFavorites(newFavorite)
                              }
                            />
                          ))}
                        </Grid>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  // request movies from api
  let response = await fetch(`http://localhost:3000/api/movies`, {
    method: "GET",
  })
  let data = await response.json()

  return {
    props: {
      movies: data.movies.slice(0, 40),
    },
  }
}
