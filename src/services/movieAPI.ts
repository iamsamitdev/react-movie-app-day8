import http from '@/services/configAxios'

// Read All Movies
const getAllMovies = async () => {
    const response = await http.get('/admin/movies')
    return response.data
}

// Create a New Movie
const createMovie = async (movieData: {
    title: string
    release_date: string
    runtime: number
    mpaa_rating: string
    description: string
    image: string
    genres_array: number[]
}) => {
    const response = await http.post('/admin/movies', movieData)
    return response.data
}


export { getAllMovies, createMovie }