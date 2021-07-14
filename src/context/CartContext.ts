import React from "react";
import product from "../model/Product";
import useCart from "../types/UseCart";

const CarContext = React.createContext<useCart>({
    addToCart: (product: product)=> 0,
    removeFromCart: (id: number)=>0,
    changeProductQuantity: (id: number, quantity: number) => {},
    removeProduct: (id: number) =>{},
    removeAllProducts:()=>{},
    cartState: []
});

export default CarContext;