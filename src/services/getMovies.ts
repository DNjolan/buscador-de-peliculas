const UTL_ENDPOINT = 'https://www.omdbapi.com/?apikey=9a0e9f98&s='

export async function getMovies(query: string) {
    try {
        const res = await fetch(UTL_ENDPOINT + query)
        const data = await res.json()
        if (res) return {movies: data.Search, response: true}
        throw new Error('No existen películas para: ' + query)
    } catch (error) {
        return {error, response: false}
    }
}