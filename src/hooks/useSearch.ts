import { useCallback, useState } from "react"
import { getMovies } from "../services/getMovies"
import debounce from "just-debounce-it"

type TypeMovie = {
    imdbID: string,
    Title: string,
    Year: string,
    Type: string,
    Poster: string
}

export default function useSearch() { 
    const [query, setQuery] = useState<string>('')
    const [movies, setMovies] = useState<TypeMovie[]>([])
    const [afterQuery, setAfterQuery] = useState<string>('')
    
    const debounceMovies = useCallback(debounce((newQuery: string) => {
        getMovies(newQuery).then(res => {
            if (res.response) {
                setMovies(res.movies)
            }
        })
    }, 300), [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (afterQuery === query) return
        setAfterQuery(query)
        getMovies(query).then(res => {
            if (res.response) {
                setMovies(res.movies)
            }
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setQuery(newQuery)
        debounceMovies(newQuery)
    }
    
    return {query, movies, handleChange, handleSubmit}
}