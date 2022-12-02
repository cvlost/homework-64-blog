import React from 'react';
import PostForm from "../../components/PostForm/PostForm";

const CreatePost = () => {
  return (
    <div className="container custom-mw border shadow mt-3 py-4 rounded-3">
      <h2 className="text-center">Create a new Post</h2>
      <PostForm/>
    </div>
  );
};

export default CreatePost;