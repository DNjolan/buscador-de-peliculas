import { useEffect, useState } from "react"

const API_KEY: string = '9a0e9f98'
const URL_SEARCH_MOVIES_BY_TITLE: string =  `https://www.omdbapi.com/?apikey=${API_KEY}&s=`

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

export default function App() {
  const [movies, setMovies] = useState<TypeMovie[]>([])
  const [search, setSearch] = useState('')
  const [searchError, setSearchError] = useState(false)

  const mappedMovie: TypeMovieMapped[] = movies.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    type: movie.Type,
    poster: movie.Poster
  }))
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (search) {
      fetch(URL_SEARCH_MOVIES_BY_TITLE+search)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.Response === 'True') {
          setMovies(data.Search)
          return
        }
        throw new Error('Error en la petición get')
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
          {search ? (mappedMovie.map((movie) => {
            return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={"Poster de la película " + movie.title + " del año " + movie.year} />
              <p>{movie.year}</p>
            </li>
            )
          })): <p>Error</p>}
        </ul>
      </main>
    </div>
  )
}