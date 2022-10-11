import {createContext, useState, useContext} from "react"

const BasketContext = createContext();

const BasketProvider = ({children})=>{
    const [items,setItems]=useState([]);
    const [color,setColor]=useState([]);
    const [size,setSize]=useState([]);
    const [amount,setAmount]=useState(1)
    const [estimatedShipping,setEstimatedShipping]=useState(5.90)
    const [shippingDiscount,setShippingDiscount]=useState(-5.90)

    const addToBasket= (data)=>{
       setItems((prev)=>[...prev,data])
    }

    const values = {
        items,
        setItems,
        addToBasket,
        amount,
        setAmount,
        size,
        setSize,
        estimatedShipping,
        shippingDiscount
    }

    return (
        <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
    )
};

const useBasket = ()=> useContext(BasketContext)

export {BasketProvider,useBasket};