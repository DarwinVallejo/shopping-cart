import { useQuery } from "react-query";
import Product from "../model/Product";

const useProducts = () => {
  return useQuery<Product[], Error>(
    'list-products',
    () => fetch('https://products-api-meru.vercel.app/api/products').then(res => res.json())
  );
}

export default useProducts;