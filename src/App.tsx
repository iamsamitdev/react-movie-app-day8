import { Route, Routes, BrowserRouter } from "react-router-dom"
import Home from "@/pages/frontend/Home"
import About from "@/pages/frontend/About"
import Team from "@/pages/frontend/Team"
import Project from "@/pages/frontend/Project"
import Register from "@/pages/auth/Register"
import Login from "@/pages/auth/Login"
import Dashboard from "@/pages/backend/Dashboard"
import Movies from "@/pages/backend/Movies"
import Genres from "@/pages/backend/Genres"
import Users from "@/pages/backend/Users"


// rfce
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Frontend Page */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/teams" element={<Team />} />
        <Route path="/projects" element={<Project />} />

        {/* Auth Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Backend Page */}
        <Route path="/backend/dashboard" element={<Dashboard />} />
        <Route path="/backend/movies" element={<Movies />} />
        <Route path="/backend/genres" element={<Genres />} />
        <Route path="/backend/users" element={<Users />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App