import { useEffect, useState } from "react";
import STORAGE from "../constants/Storage";
import product from "../model/Product";
import ProductCart from "../model/ProductCart";
import UseCart from "../types/UseCart";

const useCart = ():UseCart => {
    const [cartState, setCartState] = useState<ProductCart[]>();

    const getCart = (): ProductCart[] => {
        try {
            const item = localStorage.getItem(STORAGE.CART);
            const cartProducts: ProductCart[] = item ? JSON.parse(item) : [];
            
            return cartProducts;

        }
        catch (error) {
            return []
        }
    }

    const addToCart = (product: product): number => {
        const cartProducts = [...cartState];
        const cartProductIndex = cartProducts.findIndex(item => item.product.id === product.id);
        if (cartProductIndex >= 0) {
            cartProducts[cartProductIndex].quantity++;
        } else {
            cartProducts.push({ product, quantity: 1 })
        }
        setCartState([...cartProducts]);
        localStorage.setItem(STORAGE.CART, JSON.stringify(cartProducts));

        return cartProducts[cartProductIndex]?.quantity;
    }

    const removeFromCart = (id: number): number => {
        let cartProducts = [...cartState];
        const cartProductIndex = cartProducts.findIndex(item => item.product.id === id);
        if (cartProducts[cartProductIndex].quantity < 2) 
        cartProducts = cartProducts.filter(item => item.product.id !== id);
        else
        cartProducts[cartProductIndex].quantity--

        setCartState([...cartProducts]);
        localStorage.setItem(STORAGE.CART, JSON.stringify(cartProducts));

        return cartProducts[cartProductIndex]?.quantity;
    }

    const changeProductQuantity = (id: number, quantity: number) => {
        let cartProducts = [...cartState];
        const cartProductIndex = cartProducts.findIndex(item => item.product.id === id);
        cartProducts[cartProductIndex].quantity = quantity;
        setCartState([...cartProducts]);
        localStorage.setItem(STORAGE.CART, JSON.stringify(cartProducts));
    }

    const removeProduct = (id: number) => {
        let cartProducts = [...cartState];
        cartProducts = cartProducts.filter(item => item.product.id !== id);
        setCartState([...cartProducts]);
        localStorage.setItem(STORAGE.CART, JSON.stringify(cartProducts));
    }

    const removeAllProducts = () => {
        setCartState([]);
        localStorage.setItem(STORAGE.CART, JSON.stringify([]));
    }

    useEffect(()=> {
        setCartState(getCart);
    },[])

    return {
        cartState,
        addToCart,
        removeFromCart,
        changeProductQuantity,
        removeProduct,
        removeAllProducts
    }
}

export default useCart;