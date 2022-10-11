import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import {useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat,filters,sort}) => {
  const [products,setProducts]=useState([])
  const [filteredProducts,setFilteredProducts]=useState([])
  useEffect(()=>{

    axios.get(cat 
      ? `http://localhost:5000/api/products?category=${cat}`
      : "http://localhost:5000/api/products"
    
    ).then((response) =>{setFilteredProducts(response.data);console.log(response.data)} )
    .catch((error) => console.log(error))
  },[cat])

  useEffect(()=>{
    cat && setFilteredProducts(
      products.filter(item=>Object.entries(filters).every(([key,value])=>item[key].includes(value)))
    )
  },[products,cat,filters])

  useEffect(()=>{
    if(sort==="newest"){
      setFilteredProducts((prev)=>[...prev].sort((a,b)=>a.createAt-b.createAt));
    }else if(sort==="asc"){
      setFilteredProducts((prev)=>[...prev].sort((a,b)=>a.price-b.price));
    }else{
      setFilteredProducts((prev)=>[...prev].sort((a,b)=>b.price-a.price));
    }
  },[sort])


  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
