import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/about" element={<About />}>
          <Route path="mission" element={<Mission />} />
          <Route path="our-team" element={<OurTeam />} />
          <Route path="contact-us" element={<ContactUs />} />
        </Route>
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:articleId" element={<ArticleDetails />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
