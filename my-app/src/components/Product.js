import React from "react";
import { NavLink } from "react-router-dom";

const Product = ({ id, name, image, onClick }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <NavLink to={`/${id}`} onClick={handleClick}>
      <div className="card">
        <figure>
          <img src={image} alt={name} />
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;

/*------------------old working  code but it put me on the middle of the screen when i click on any components-----

import React from "react";
import { NavLink } from "react-router-dom";

const Product = ({ id, name, image, onClick }) => {
  return (
    <div onClick={onClick}>
    
        <div className="card">
          <figure>
            <img src={image} alt={name}  />
            
            </figure>

            <div className="card-data">
              <div className="card-data-flex">
                <h3>{name}</h3>
              </div>
            </div>
          </div>
      
      </div>
    );
  };
  
  export default Product;
  









*/
