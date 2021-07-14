import { useContext } from "react";
import QUERY_STATUS from "../../constants/QueryStatus";
import CartContext from "../../context/CartContext";
import useProducts from "../../hooks/useProducts"
import Product from "../../model/Product";
import ProductItem from "./ProductItem"
import ProductSkeleton from "./ProductSkeleton";

const Products = () => {
    const { status, error, data } = useProducts();
    const { addToCart } = useContext(CartContext);
    const handleAddToCart = (productItem: Product) => {
        addToCart(productItem);
    }

    return (
        <div className="grid gap-6 grid-cols-1 mx-4 sm:grid-cols-3 lg:grid-cols-5 lg:mx-auto">
            {
                 status === QUERY_STATUS.LOADING && (
                     <ProductSkeleton />
                 )
            }
            {
                status === QUERY_STATUS.SUCCESS && data?.map((item) => (
                    <ProductItem key={item.id} item={item} handleAddToCart={handleAddToCart}/>
                ))
            }
        </div>
    )
}

export default Products