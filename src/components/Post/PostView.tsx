import React from 'react';
import {PostWithId} from "../../types";
import {Link} from "react-router-dom";
import './PostView.css';

interface Props extends PostWithId {
  selected: boolean;
}

const PostView: React.FC<Props> = (props) => {
  const selectedClass = props.selected ? 'bg-primary bg-opacity-10' : '';

  const date = new Date(props.date);
  const dateString = date.toLocaleDateString('en', {dateStyle: "medium"});

  return (
    <div className={`card mb-4 shadow ${selectedClass}`}>
      <div className="card-header">
        <h4 className="text-center">{props.title}</h4>
      </div>
      <div className="card-body py-5 overflow-hidden" style={{whiteSpace: "pre-wrap", maxHeight: '12em'}}>
        {props.content}
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <small className="fst-italic text-secondary">{dateString}</small>
        <Link
          to={`posts/${props.id}`}
          className="btn btn-dark"
        >
          More
        </Link>
      </div>
    </div>
  );
};

export default PostView;