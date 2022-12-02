import React from 'react';

const PostDeleted = () => {
  return (
    <>
      <h3>Details</h3>
      <div className="alert alert-success text-center sticky-top">
        The post has been <strong>deleted</strong> successfully!
      </div>
    </>
  );
};

export default PostDeleted;