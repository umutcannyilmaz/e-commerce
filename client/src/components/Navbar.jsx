import { Badge } from "@material-ui/core";
// material-ui iconları kullanabilmek için 
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useBasket } from "../contexts/BasketContext";

//npm install styled-components pek çok iyi firma kullanıyor..
// styled.div`` kullanarak css özellikleri buraya yazıyoruz. Büyük projelerde className kullanılmaz.
const Container = styled.div`
  height: 60px;
  top: 0;
  position: sticky;
  z-index:100;
  ${mobile({ height: "50px" })}
`;

// Wrapper navbar container'ı içinde ayarlamamızda kullanıyoruz
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

// flex:1 diyerek 3 ögeyi esit genişlikte ayarladık birine flex:2 deseydik diğerlerinden büyük olurdu..
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

//npm install react-i18next dil kütüphanesi kullan!!!!
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

// React-Router with styled-component..
const LogoLink =styled(Link)`
text-decoration:none;
&:hover{color:black}
`


const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const{loggedIn}=useAuth();
  const{items}=useBasket()
  console.log("burada",loggedIn)
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
         <LogoLink to="/home"><Logo>UCY</Logo></LogoLink>
        </Center>
        <Right>
          {!loggedIn && 
          <>
         <Link to="/register"><MenuItem>REGISTER</MenuItem></Link> 
          <Link to="/login"><MenuItem>SIGN IN</MenuItem></Link>
          </>
          }
          {
            loggedIn && 
            <>
            <Link to=""> <MenuItem>Profile</MenuItem></Link>
            
          

          <MenuItem>   
        <Link to="/card"> <Badge badgeContent={items.length} color="primary">
             <ShoppingCartOutlined />
            </Badge></Link> 
          </MenuItem>
          </>
}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
