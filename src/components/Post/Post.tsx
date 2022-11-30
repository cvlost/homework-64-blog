import React from 'react';

interface Props {
  date: string;
  id: string;
  content: string;
}

const Post: React.FC<Props> = ({date, id, content}) => {
  return (
    <div className="card">
      <div className="card-header">{date}</div>
      <div className="card-body">{content}</div>
      <button className="btn btn-primary">More</button>
    </div>
  );
};

export default Post;