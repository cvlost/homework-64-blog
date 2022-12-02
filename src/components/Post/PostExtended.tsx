import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, useOutlet, useParams} from "react-router-dom";
import {Post} from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../Spinner/Spinner";

interface Props {
  setSelected: (id: string) => void;
  onDelete: () => void;
}

const PostExtended: React.FC<Props> = ({setSelected, onDelete}) => {
  const {id} = useParams();
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();

  const removePost = useCallback(async () => {
    console.log('removing post: ', id)
    setIsFetching(true);
    await axiosApi.delete(`/posts/${id}.json`);
    setIsFetching(false);
    onDelete();
    navigate('/posts/deleted')
  }, [id, navigate, onDelete]);

  useEffect(() => {
    if (id) setSelected(id);

    return () => {
      if (id) setSelected('');
    }
  }, [id, setSelected]);

  const [post, setPost] = useState<Post | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPost = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await axiosApi.get<Post>(`/posts/${id}.json`);
      if (response.data !== null) {
        setPost(response.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost().catch(console.error);
  }, [fetchPost, location]);

  let output: React.ReactNode | null;

  if (isFetching)
    output = <Spinner/>
  else if (post !== null) {
    const date = new Date(post.date);
    const dateString = date.toLocaleTimeString() + ' ' +
      date.toLocaleDateString('en', {dateStyle: 'full'});

    output = (
      <div className="card shadow">
        <div className="card-header">
          <h5>
            <small className="text-secondary fw-bold me-2 fs-6 fst-italic">Title: </small>
            {post.title}
          </h5>
          <small className="py-0 text-secondary"><em className="fw-bold me-2 fs-6">Date: </em>{dateString}</small>
        </div>
        <div className="card-body py-5" style={{whiteSpace: "pre-wrap"}}>
          <small className="d-block fw-bold mb-3 text-secondary fst-italic">Description: </small>
          {post.content}
        </div>
        <div className="card-footer d-flex gap-2 justify-content-center">
          <Link to="edit" className="btn btn-primary">Edit</Link>
          <button onClick={removePost} className="btn btn-danger">Delete</button>
          <Link to='..' className="btn btn-secondary">Back</Link>
        </div>
      </div>
    );
  } else
    output = <div>Couldn't get post information</div>;

  return (
    <div className="col">
      <div className="sticky-top">
        {outlet || (
          <div className="col">
            <h3>Details</h3>
            {output}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostExtended;