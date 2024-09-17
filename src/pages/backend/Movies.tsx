import BackLayout from "@/components/layouts/BackLayout"
import { getAllMovies, createMovie } from "@/services/movieAPI"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from 'react-hook-form'

// สร้าง Type สำหรับข้อมูลภาพยนต์
type Movie = {
    id: number
    title: string
    release_date: string
    runtime: number
    mpaa_rating: string
    description: string
    image: string
}

// สร้าง Type สำหรับไว้รับข้อมูลจาก Form
type MovieFormInput = {
    title: string
    release_date: string
    runtime: number
    mpaa_rating: string
    description: string
    image: string
    genres_array: number[]
}

function Movies() {

    document.title = 'Movies'

    // สร้างตัวแปรแบบ State ไว้เก็บข้อมูล Movies
    const [movies, setMovies] = useState<Movie[]>([])
    // สร้างตัวแปรไว้เปิด/ปิด Modal
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    // สร้างตัวแปร useForm สำหรับใช้งาน Form
    const { register, handleSubmit, formState: { errors }, reset } = useForm<MovieFormInput>()
    // สร้างตัวแปรเก็บข้อมูล Genres
    const genresOptions = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' },
        { id: 3, name: 'Comedy' },
        { id: 4, name: 'Drama' },
        { id: 5, name: 'Horror' },
    ]

    // สร้างฟังก์ชันเพื่อดึงข้อมูลภาพยนต์ทั้งหมด
    const fetchMovies = async () => {
        const movies: Movie[] = await getAllMovies()
        setMovies(movies)
        console.log(movies)
    }

    // เรียกใช้ฟังก์ชัน fetchMovies เมื่อ Component ถูกโหลด
    useEffect(() => {
        fetchMovies()
    }, [])


    // ฟังก์ชันสำหรับเปิดหน้า Add Movie
    const handleAddMovie = () => {
        setModalIsOpen(true)
        // console.log(modalIsOpen)
    }

    // สร้างฟังก์ชันสำหรับ Submit Form
    const onSubmit: SubmitHandler<MovieFormInput> = async (data) => {
        try {
            console.log(data)
            // เรียกใช้ API เพื่อบันทึกข้อมูลภาพยนต์
            await createMovie(data)

            // ดึงข้อมูลภาพยนต์ใหม่
            fetchMovies()

            // reset ค่าใน Form
            reset()

            // ปิด Modal
            setModalIsOpen(false)
        } catch (error) {
            console.error("Failed to save the movie", error)
        }
    }

    return (
        <BackLayout>
            <>
                {/* Modal สำหรับเพิ่มภาพยนต์ */}
                {
                    modalIsOpen && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                                <h2 className="text-xl font-bold mb-4">Add New Movie</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <label className="block mb-2 text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        {...register('title', { required: "Title is required" })}
                                        className="border p-2 w-full mb-4"
                                    />
                                    {errors.title && <p className="text-red-500  mb-4">{errors.title.message}</p>}
                                    
                                    <label className="block mb-2 text-gray-700">Release Date</label>
                                    <input
                                        type="date"
                                        {...register('release_date', { required: "Release Date is required" })}
                                        className="border p-2 w-full mb-4"
                                        onChange={(e) => {
                                            const date = new Date(e.target.value)
                                            const formattedDate = date.toISOString().split('T')[0]
                                            return formattedDate
                                        }}
                                    />
                                    {errors.release_date && <p className="text-red-500 mb-4">{errors.release_date.message}</p>}

                                    <label className="block mb-2 text-gray-700">Runtime (min)</label>
                                    <input
                                        type="number"
                                        placeholder="Runtime"
                                        {...register('runtime', { required: "Runtime is required", min: { value: 1, message: "Runtime must be at least 1 minute" } })}
                                        className="border p-2 w-full mb-4"
                                    />
                                    {errors.runtime && <p className="text-red-500 mb-4">{errors.runtime.message}</p>}
                                    
                                    <label className="block mb-2 text-gray-700">MPAA Rating</label>
                                    <input
                                        type="text"
                                        placeholder="MPAA Rating"
                                        {...register('mpaa_rating', { required: "MPAA Rating is required" })}
                                        className="border p-2 w-full mb-4"
                                    />
                                    {errors.mpaa_rating && <p className="text-red-500 mb-4">{errors.mpaa_rating.message}</p>}

                                    <label className="block mb-2 text-gray-700">Description</label>
                                    <textarea
                                        placeholder="Description"
                                        {...register('description', { required: "Description is required" })}
                                        className="border p-2 w-full mb-4"
                                    />
                                    {errors.description && <p className="text-red-500 mb-4">{errors.description.message}</p>}

                                    <label className="block mb-2 text-gray-700">Image Path</label>
                                    <input
                                        type="text"
                                        placeholder="Image Path"
                                        {...register('image', { required: "Image path is required" })}
                                        className="border p-2 w-full mb-4"
                                    />
                                    {errors.image && <p className="text-red-500 mb-4">{errors.image.message}</p>}

                                    <label className="block mb-2 text-gray-700">Genres</label>
                                    <select
                                        multiple
                                        {...register('genres_array', { required: "At least one genre must be selected" })}
                                        className="border p-2 w-full mb-4"
                                    >
                                        {genresOptions.map((genre) => (
                                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                                        ))}
                                    </select>
                                    {errors.genres_array && <p className="text-red-500">{errors.genres_array.message}</p>}

                                    
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => setModalIsOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }

                {/* ส่วนหัว tile ของหน้า page นี้ */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl text-black">Movies</h1>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddMovie}>
                            Add Movie
                        </button>
                    </div>
                </div>

                {/* ตารางแสดงผลข้อมูลภาพยนต์ */}
                <div className="bg-white overflow-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Cover</th>
                                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
                                <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Release Date</th>
                                <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Runtime (min)</th>
                                <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Rating</th>
                                <th className="w-36 text-left py-3 px-4 uppercase font-semibold text-sm">Manage</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                movies.map((movie) => (
                                <tr className="border-b border-gray-200">
                                    <td className="text-left py-3 px-4">
                                    {movie.image ? <img src={'https://image.tmdb.org/t/p/w200'+movie.image} alt={movie.title} className="w-20 h-auto" /> : "No Image"}
                                    </td>
                                    <td className="text-left py-3 px-4">{movie.title || "N/A"}</td>
                                    <td className="text-left py-3 px-4">{movie.release_date ? new Date(movie.release_date).toLocaleDateString() : "N/A"}</td>
                                    <td className="text-left py-3 px-4">{movie.runtime > 0 ? movie.runtime : "N/A"}</td>
                                    <td className="text-left py-3 px-4">{movie.mpaa_rating || "N/A"}</td>
                                    <td className="text-left py-3 px-4 w-28">
                                        <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        </BackLayout>
    )
}

export default Movies