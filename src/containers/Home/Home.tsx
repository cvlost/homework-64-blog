import React from 'react';
import {Outlet} from "react-router-dom";
import PostList from "../../components/PostList/PostList";

interface Props {
  selectedId: string;
  needUpdate: boolean;
}

const Home: React.FC<Props> = ({selectedId, needUpdate}) => {
  return (
    <div className="container row-cols-12 h-100">
      <div className="row h-100">
        <PostList selectedId={selectedId} needUpdate={needUpdate}/>
        <Outlet/>
      </div>
    </div>
  );
};

export default Home;