import React, {useEffect, useState} from 'react';
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import CreatePost from "./containers/CreatePost/CreatePost";
import About from "./containers/About/About";
import Contacts from "./containers/Contacts/Contacts";
import Navbar from "./components/Navbar/Navbar";
import PostExtended from "./components/Post/PostExtended";
import PostForm from "./components/PostForm/PostForm";
import PostDeleted from "./components/Post/PostDeleted";
import NotFound404 from "./components/NotFound404/NotFound404";
import './Blog.css';

function Blog() {
  const [selectedId, setSelectedId] = useState('');
  const [needUpdate, setNeedUpdate] =  useState(false);

  const requireUpdate = () => {
    setNeedUpdate(true);
  };

  useEffect(() => {
    if (needUpdate) {
      setNeedUpdate(false);
    }
  }, [needUpdate]);

  return (
    <div className="vh-100 d-flex flex-column">
      <header>
        <Navbar/>
      </header>
      <main className="flex-grow-1 h-100 overflow-auto">
        <Routes>
          <Route path="/" element={
            <Home needUpdate={needUpdate} selectedId={selectedId}/>
          }>
            <Route path="posts/deleted" element={
              <div className="col">
                <PostDeleted/>
              </div>
            }/>
            <Route path="posts/:id/" element={(
              <PostExtended
                onDelete={requireUpdate}
                setSelected={setSelectedId}
              />
            )}>
              <Route path="edit" element={
                <div className="col">
                  <h3>Details</h3>
                  <div className="card shadow">
                    <div className="card-body">
                      <PostForm onEdit={requireUpdate}/>
                    </div>
                  </div>
                </div>}/>
            </Route>
          </Route>
          <Route path="/create" element={<CreatePost/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="*" element={<NotFound404/>}/>
        </Routes>
      </main>
      <Outlet/>
      <footer className="text-bg-dark">
        <div className="container py-3 text-end">
          Blog - 2022
        </div>
      </footer>
    </div>
  );
}

export default Blog;
