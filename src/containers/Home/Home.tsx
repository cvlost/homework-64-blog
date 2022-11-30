import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "../../axiosApi";
import {PostResponse, PostWithId} from "../../types";
import Post from "../../components/Post/Post";
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const [posts, setPosts] = useState<PostWithId[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPosts = useCallback(async () => {
    setIsFetching(true);
    try {
      console.log('fetching')
      const response = await axiosApi.get<PostResponse>('/posts.json');
      console.log(response.data)
      if (response.data !== null) {
        const modifiedPosts: PostWithId[] = [];
        for (let [id, post] of Object.entries(response.data)) {
          modifiedPosts.push({...post, id});
        }
        setPosts(modifiedPosts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }

  }, []);

  useEffect(() => {
    fetchPosts().catch(console.error);
  }, [fetchPosts]);

  let postsOutput: React.ReactNode | null;

  if (isFetching)
    postsOutput = <Spinner/>
  else if (posts !== null)
    postsOutput = (
      <div>
        {posts.map((post) => <Post key={post.id} {...post}/>)}
      </div>
    );
  else
    postsOutput = <Link to='/create'>create a new one</Link>;

  return (
    <div className="container">
      <h1>Home</h1>
      <div className="row">
        {postsOutput}
      </div>
    </div>
  );
};

export default Home;