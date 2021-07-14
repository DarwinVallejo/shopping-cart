import product from "../model/Product";
import productCart from "../model/ProductCart";

export type UseCart = {
    cartState: productCart[],
    addToCart: (product: product)=>number,
    removeFromCart: (id: number)=>number,
    changeProductQuantity: (id: number, quantity: number) => void,
    removeProduct: (id: number) => void
    removeAllProducts:()=>void
}

export default UseCart;