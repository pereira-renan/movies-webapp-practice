import { useState, useRef, createContext, useContext } from "react"

const MoviesContext = createContext()

function MoviesProvider({ children }) {
  const [viewDetails, setViewDetails] = useState(false)
  const [details, setDetails] = useState({})
  const [favorites, setFavorites] = useState([])
  const [catalog, setCatalog] = useState([])
  const selectedFavorite = useRef({})
  const [filter, setFilter] = useState("")

  return (
    <MoviesContext.Provider
      value={{
        details,
        setDetails,
        viewDetails,
        setViewDetails,
        catalog,
        setCatalog,
        favorites,
        setFavorites,
        selectedFavorite,
        filter,
        setFilter,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export { MoviesContext, MoviesProvider }
