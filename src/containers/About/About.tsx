import React from 'react';

const About = () => {


  return (
    <div className="container">
      <div className="row h-100 mb-5">
        <div className="col d-flex">
          <div className="custom-mw m-auto">
            <h3 className="border-bottom border-3 text-end mb-3 pb-2">Who Am I</h3>
            <p>some Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, aliquid at
              dolore eveniet ipsa ipsum natus nulla omnis perspiciatis possimus ratione vitae voluptatum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad asperiores aut
              corporis dignissimos doloremque eveniet fugiat ipsam iste itaque labore libero  voluptatem! Pariatur!</p>
          </div>
        </div>
        <div className="col d-flex">
          <img
            className="m-auto img-fluid"
            style={{maxHeight: '70vh'}}
            src="https://i.ibb.co/GC42Hgc/the-big-lebowski-face-woo-aro-transparent.png" alt="avatar"/>
        </div>
      </div>

      <div className="row h-100 mb-5">
        <div className="col d-flex">
          <img
            className="m-auto img-fluid"
            style={{maxHeight: '70vh'}}
            src="https://i.ibb.co/zZvR3rB/pngegg.png" alt="avatar"/>
        </div>
        <div className="col d-flex">
          <div className="custom-mw m-auto">
            <h3 className="border-bottom border-3 mb-3 pb-2">Writing about</h3>
            <p>some Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, aliquid at
              dolore eveniet ipsa ipsum natus nulla omnis perspiciatis possimus ratione vitae voluptatum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad asperiores aut
              corporis dignissimos doloremque eveniet fugiat ipsam iste itaque labore libero  voluptatem! Pariatur!</p>
          </div>
        </div>
      </div>

      <hr className="mb-5"/>

      <div className="row h-100 mb-5">
        <div className="custom-mw d-flex">
          <div className="custom-mw m-auto">
            <h3 className="border-bottom border-3 text-center mb-3 pb-2">Future comes</h3>
            <p>some Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, aliquid at
              dolore eveniet ipsa ipsum natus nulla omnis perspiciatis possimus ratione vitae voluptatum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad asperiores aut
              corporis dignissimos doloremque eveniet fugiat ipsam iste itaque labore libero  voluptatem! Pariatur!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;