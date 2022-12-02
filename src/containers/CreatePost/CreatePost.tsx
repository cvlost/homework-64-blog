import React from 'react';
import PostForm from "../../components/PostForm/PostForm";

const CreatePost = () => {
  return (
    <div className="container custom-mw h-100 d-flex flex-column py-4">
      <h2 className="text-center">Create a new Post</h2>
      <PostForm/>
    </div>
  );
};

export default CreatePost;