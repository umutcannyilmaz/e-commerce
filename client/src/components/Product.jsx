import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 300px;
  height: 350px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  

  &:hover ${Info}{
    opacity: 1;
  }
`;

const PriceContainer =styled.div`
padding-top:20px;
padding-left:20px;
height:60px;
text-align: left;
font-size: 12px;
  text-overflow:ellipsis;
  width:300px;
  color:black
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

// object-fit:contain dive sığdıracak şekilde boyutlanmasını sağladık..
const Image = styled.img`
  height: 75%;
  object-fit: contain;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <Link to={`/products/product/${item._id}`} style={{ textDecoration: 'none' }}> 
    <Container>
      
      <Circle />
      
      <Image src={item.img} />
      
      <Info >
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
      <PriceContainer>
      {item.title} <br/>
       {item.price}$
        
      </PriceContainer>
    </Container>
    </Link>
  );
};

export default Product;
