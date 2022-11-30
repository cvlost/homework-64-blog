import React, {useCallback, useEffect, useState} from 'react';
import {Post} from "../../types";
import axiosApi from "../../axiosApi";

const PostForm = () => {
  const [post, setPost] = useState<Post>({
    content: '',
    date: ''
  });

  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
    setPost(prev => ({...prev, content: value}));
  };

  const sendPost = useCallback(async () => {
    setIsFetching(true);
    await axiosApi.post('/posts.json', post);
    setIsFetching(false);
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = (new Date()).toISOString();
    setPost(prev => ({...prev, date: date}));
  };

  useEffect(() => {
    if (post.date !== '') sendPost().catch(console.error);
  }, [post.date, sendPost]);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isFetching}>
        <div className="form-group mb-3">
          <label htmlFor="post-text">You post: </label>
          <textarea
            name="content"
            id="post-text"
            className="form-control"
            required
            value={post.content}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Post</button>
        </div>
      </fieldset>
    </form>
  );
};

export default PostForm;