import React, {useCallback, useEffect, useState} from 'react';
import {Post} from "../../types";
import axiosApi from "../../axiosApi";
import {Link, useNavigate, useParams} from "react-router-dom";

interface Props {
  onEdit?: () => void;
}

const PostForm: React.FC<Props> = ({onEdit}) => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [post, setPost] = useState<Post>({
    content: '',
    date: '',
    title: '',
  });

  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement> |
      React.ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = e.target;
    setPost(prev => ({...prev, [name]: value}));
  };

  const sendPost = useCallback(async () => {
    setIsFetching(true);
    await axiosApi.post('/posts.json', post);
    setPost({
      content: '',
      date: '',
      title: '',
    })
    setIsFetching(false);
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      editPost().catch(console.error);
    } else {
      const date = (new Date()).toISOString();
      setPost(prev => ({...prev, date: date}));
    }
  };

  useEffect(() => {
    if (post.date !== '' && typeof id !== 'string') sendPost().catch(console.error);
  }, [post.date, id, sendPost]);

  const getPost = useCallback(async () => {
    if (id) {
      setIsFetching(true);
      const response = await axiosApi<Post>(`/posts/${id}.json`);
      setPost(response.data);
      setIsFetching(false);
    }
  }, [id]);

  const editPost = useCallback(async () => {
    setIsFetching(true);
    await axiosApi.put(`/posts/${id}.json`, post);
    setIsFetching(false);
    if (onEdit) onEdit();
    navigate(`/posts/${id}`);
  }, [id, post, onEdit, navigate]);

  useEffect(() => {
    if (id) getPost().catch(console.error);
  }, [getPost, id]);

  return (
    <form onSubmit={handleSubmit} className="card shadow">
      <fieldset disabled={isFetching}>
        <div className="card-header mb-3">
          <label htmlFor="post-title" className="fw-bold text-secondary">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            required
            value={post.title}
            onChange={handleChange}
          />
        </div>
        <div className="card-body mb-3">
          <label htmlFor="post-text" className="fw-bold text-secondary">Description</label>
          <textarea
            name="content"
            id="post-text"
            className="form-control"
            required
            value={post.content}
            onChange={handleChange}
            rows={6}
          />
        </div>
        <div className="d-flex gap-2 justify-content-center card-footer">
          <button type="submit" className="btn btn-primary btn-lg">Post</button>
          {id ? <Link to=".." type="button" className="btn btn-secondary btn-lg">Cancel</Link> : null}
        </div>
      </fieldset>
    </form>
  );
};

export default PostForm;