import React, {useCallback, useEffect, useState} from 'react';
import {Post, PostResponse, PostWithId} from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../Spinner/Spinner";
import PostView from "../Post/PostView";
import {Link} from "react-router-dom";
import './PostList.css';
import {CSSTransition, TransitionGroup} from "react-transition-group";

interface Props {
  selectedId: string;
  needUpdate: boolean;
}

const PostList: React.FC<Props> = ({selectedId, needUpdate}) => {
  const [posts, setPosts] = useState<PostWithId[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPosts = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await axiosApi.get<PostResponse>('/posts.json');
      if (response.data !== null) {
        const modifiedPosts: PostWithId[] = [];
        for (let [id, post] of Object.entries(response.data)) {
          modifiedPosts.push({...post, id});
        }
        setPosts(modifiedPosts);
      }
    } finally {
      setIsFetching(false);
    }
  }, []);

  const removePost = useCallback((selectedId: string) => {
    console.log('Removing post from state')
    const i = posts?.findIndex((post) => post.id === selectedId);
    setPosts(prev => {
      const copy = [...prev!];
      copy.splice(i!, 1);
      return copy;
    });
  }, [posts]);

  const refreshPost = useCallback((selectedId: string, newData: Post) => {
    const i = posts?.findIndex((post) => post.id === selectedId);
    const postsCopy = [...posts!];
    postsCopy[i!] = {...newData, id: selectedId};
    setPosts(() => postsCopy)
  }, [posts]);

  const fetchSinglePost = useCallback(async () => {
    if (needUpdate) {
      try{
        const response = await axiosApi.get<Post>(`/posts/${selectedId}.json`);
        if (response.data === null) removePost(selectedId);
        else refreshPost(selectedId, response.data);
      } finally {

      }
    }
  }, [needUpdate, refreshPost, removePost, selectedId]);

  useEffect(() => {
    fetchPosts().catch(console.error);
  }, [fetchPosts]);

  useEffect(() => {
    fetchSinglePost().catch(console.error);
  }, [fetchSinglePost, needUpdate])

  const isSelected = (id: string) => selectedId === id;

  let postsOutput: React.ReactNode | null;

  if (isFetching)
    postsOutput = <Spinner/>
  else if (posts !== null && posts.length > 0)
    postsOutput = (
      <TransitionGroup>
        {posts.map((post) => (
          <CSSTransition
            key={post.id}
            timeout={400}
            classNames="Post"
            appear={true}
          >
            <PostView
              selected={isSelected(post.id)}
              {...post}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  else
    postsOutput = (
      <div className="alert alert-info">
        <p>
          Looks like there are no posts at all.
        </p>
        <p>
          Go ahead and <Link to='/create'><strong>create one</strong></Link>!
        </p>
      </div>
    );

  return (
    <div className="col PostList h-100 overflow-auto">
      <h3>Recent posts</h3>
      {postsOutput}
    </div>
  );
};

export default PostList;