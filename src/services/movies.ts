const API_KEY: string = '9a0e9f98'
const URL_SEARCH_MOVIES_BY_TITLE: string =  `https://www.omdbapi.com/?apikey=${API_KEY}&s=`

export async function getMoviesByTitle (search: string) {
    try {
        const res = await fetch(URL_SEARCH_MOVIES_BY_TITLE+search)
        const data = await res.json()
        if (data.Response === 'True') return {movies: data.Search, response: true}
        throw new Error('Error, titulo muy corto')
    } catch (error) {
        return {error, response: false}
    }
}
