import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import Product from "../components/Product";


const featureProducts = [
  {
    id: "fertilizer",
    name: "chemical",
    image: "/images/fertilizer.jpg",
  },
  {
    id: "seed",
    name: "vegetable Seeds",
    image: "/images/seed.jpg",
  },
  {
    id: "equipment",
    name: "equipment",
    image: "/images/equipment.jpg",
  },
  {
    id: "pesticide",
    name: "pesticides",
    image: "/images/pesticide.jpg",
  },
  {
    id: "herbicide",
    name: "herbicides",
    image: "/images/herbicide.jpg",
  },
  {
    id: "plantNutrition",
    name: "plant nutrition",
    image: "/images/plant.jpg",
  },
];


const FeatureProduct = () => {
  const navigate = useNavigate();

function navigateToProduct(category) {
  navigate(`/${category}{id}`);
}
  return (
    <Wrapper className="section">
    <div className="container">
      <div className="intro-data">Check Now!</div>
      <div className="common-heading">Our Feature Services</div>
      <div className="grid grid-three-column">
        {featureProducts.map((curElem) => {
          return (
            <Product
              key={curElem.id}
              {...curElem}
              onClick={() => navigateToProduct(curElem.name)}
            />
          );
        })}
      </div>
    </div>
  </Wrapper>
);
};
/* takes this object and spreads its properties into individual props for the Product component. So,
 it is equivalent to manually passing each property as follows: 
<Product {...curElem} /> this is equal to <Product id={curElem.id} name={curElem.name} image={curElem.image} />
 */
const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 120rem;
  }

  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }

    .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }
  }

  .card {
    background-color: #fff;
    border-radius: 1rem;

    .card-data {
      padding: 0 2rem;
    }

    .card-data-flex {
      margin: 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }
`;

export default FeatureProduct;