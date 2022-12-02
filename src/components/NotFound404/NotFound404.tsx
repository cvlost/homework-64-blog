import React from 'react';

const NotFound404 = () => {
  const notFoundImg = 'https://i.ibb.co/tpK96WZ/not-found.png';

  return (
    <div className="container d-flex h-100">
      <div className="m-auto">
        <h3 className="text-secondary text-center">Not found - 404</h3>
        <img
          className="d-block m-auto"
          style={{maxHeight: '50vh', maxWidth: '100%', opacity: '.7'}}
          src={notFoundImg}
          alt="Not found"
        />
      </div>
    </div>
  );
};

export default NotFound404;