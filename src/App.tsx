import { useCallback, useState } from "react"
import { getMoviesByTitle } from "./services/movies"
import debounce from 'just-debounce-it'
// Components

export default function App() {
  const [movies, setMovies] = useState<TypeMovie[]>([])
  const [search, setSearch] = useState('')
  const [loadingMovies, setLoadingMovies] = useState(false)
  const [afterSearch, setAfterSearch] = useState('')

  console.log('Render App '+ afterSearch)

  const mappedMovie: TypeMovieMapped[] = movies.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type,
      poster: movie.Poster
  }))
  
  type TypeMovie = {
    imdbID: string,
    Title: string,
    Year: string,
    Type: string,
    Poster: string
  }

  type TypeMovieMapped = {
      id: string,
      title: string,
      year: string,
      type: string,
      poster: string
  }
  
  const handleDebounce = useCallback(
    debounce((search: string) => {
      setLoadingMovies(true)
      setAfterSearch(search)
      getMoviesByTitle(search).then(res => {
        if (!res.response) return
        setMovies(res.movies)
      }).finally(() => {
        setLoadingMovies(false)
      })
    }, 300), [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    setSearch(search)
    handleDebounce(search)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(search)
    console.log(afterSearch)
    if (search !== afterSearch) {
      setLoadingMovies(true)
      setAfterSearch(search)
      getMoviesByTitle(search).then(res => {
        if (!res.response) return
        setMovies(res.movies)
      }).finally(() => {
        setLoadingMovies(false)
      })
    }
  }


  return(
    <div>
      <header>
        <form onSubmit={handleSubmit}>
          <input type="text"
            id="search"
            value={search}
            onChange={handleChange}
          />
          <button type="submit">Buscar</button>
        </form>
      </header>
      <main>
        <ul>
          {loadingMovies ? 
            <p>Loading...</p>
            :
            (mappedMovie.map((movie) => {
            return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={"Poster de la película " + movie.title + " del año " + movie.year} />
              <p>{movie.year}</p>
            </li>
            )
          }))}
        </ul>
      </main>
    </div>
  )
}