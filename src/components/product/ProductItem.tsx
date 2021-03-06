import { FC } from "react";
import Product from "../../model/Product";
import product from '../../model/Product';
import { PlusIcon } from '@heroicons/react/solid';

const ProductItem: FC<{ product: product, handleAddToCart: (product: Product) => void }> = ({ product, handleAddToCart }) => {
  return (
    <div className="w-full max-w-sm mx-auto rounded-md shadow-md sm:mx-3 bg-white">
      <img className="sm:h-60 lg:h-56" src={product.cover} alt="Prueba" />
      <div className="px-5 py-2">
        <span className="text-lg font-bold">$ {product.price}</span>
        <h3 className="text-gray-400 font-thin truncate">{product.name}</h3>
      </div>
      <button className="px-5 py-2 w-full flex" onClick={() => handleAddToCart(product)}><PlusIcon className="h-6 w-6 text-green-500" /> Agregar al carrito</button>
    </div>
  );
}

export default ProductItem;
