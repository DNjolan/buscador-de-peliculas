type TypeMovie = {
    imdbID: string,
    Title: string,
    Year: string,
    Type: string,
    Poster: string
}

type ComponentPropMovie = {
    movies: TypeMovie[]
}

export const Movies: React.FC<ComponentPropMovie> = ({ movies }) => {
    const mappedmovies = (movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    })))

    return(
        <ul className='cardUl'>
            {(mappedmovies.map((movie) => {
                return(
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <img src={movie.poster} alt={'Película: ' + movie.title} />
                        <p>{movie.year}</p>
                    </li>
                )
            }))}
        </ul>
    )
}