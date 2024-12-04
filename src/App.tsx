import './app.css'
import { Movies } from "./components/Movies"
import useSearch from "./hooks/useSearch"

export default function App() {
  const {query, movies, handleChange, handleSubmit} = useSearch()

  return(
    <div className='containerApp'>  
      <header>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  id="query"
                  value={query}
                  onChange={handleChange}
              />
              <button type="submit">Buscar</button>
          </form>
      </header>
      <main>
        {movies ?
          (<Movies movies={movies}/>)
          :
          (<h1>Error</h1>)}
      </main>
    </div>
  )
}