import { Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";

import "flowbite/dist/flowbite.css";
import BlogList from "./components/blogs/BlogList";
import DetailsBlog from "./components/blogs/details-blog/DetailsBlog";
import PrivateRoute from "./common/route/PrivateRoute";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route element={<PrivateRoute />}>
          <Route path="/blogs/:blogId/details" element={<DetailsBlog />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
