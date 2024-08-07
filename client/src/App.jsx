import { Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

import "flowbite/dist/flowbite.css";
import BlogList from "./components/blogs/BlogList";
import DetailsBlog from "./components/blogs/details-blog/DetailsBlog";
import PrivateRoute from "./common/route/PrivateRoute";
import NotAuthenticated from "./common/not-authorized/NotAuthenticated";
import PublicRoute from "./common/route/PublicRoute";
import Authenticated from "./common/not-authorized/Authenticated";
import Logout from "./components/logout/Logout";
import Contact from "./components/contact/Contact";
import LatestCommentsList from "./components/comments/latest-comments/LatestCommentsList";
import DetailsLatestCommentListItem from "./components/comments/latest-comments/latest-comments-list-item/DetailsLatestCommentListItem";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/not-authenticated" element={<NotAuthenticated />} />
        <Route path="/authenticated" element={<Authenticated />} />
        <Route element={<PrivateRoute />}>
          <Route path="/blogs/:blogId/details" element={<DetailsBlog />} />
          <Route path="/latest-comments" element={<LatestCommentsList />} />
          <Route
            path="/latest-comments/:commentId"
            element={<DetailsLatestCommentListItem />}
          />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
