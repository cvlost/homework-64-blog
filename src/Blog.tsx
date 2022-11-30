import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import CreatePost from "./containers/CreatePost/CreatePost";
import About from "./containers/About/About";
import Contacts from "./containers/Contacts/Contacts";
import Navbar from "./components/Navbar/Navbar";

function Blog() {
  return (
    <div className="vh-100 d-flex flex-column">
      <header>
        <Navbar/>
      </header>
      <main className="flex-grow-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create" element={<CreatePost/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
        </Routes>
      </main>
      <footer className="text-bg-danger">
        footer
      </footer>
    </div>
  );
}

export default Blog;
