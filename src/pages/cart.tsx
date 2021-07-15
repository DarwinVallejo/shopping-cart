import { useContext, useState, useEffect } from "react";
import TAX from "../constants/Tax";
import CartContext from "../context/CartContext";
import Product from "../model/Product";
import { useForm } from 'react-hook-form';
import { TrashIcon, ArrowLeftIcon } from '@heroicons/react/outline';
import Link from "next/link";

const Cart = () => {
	const { cartState, addToCart, removeFromCart, changeProductQuantity, removeProduct, removeAllProducts } = useContext(CartContext);
	const [subTotalCartState, setSubTotalCartState] = useState<number>(0);
	const [taxCartSate, setTaxCartState] = useState<number>(0);
	const [totalCartState, setTotalCartState] = useState<number>(0);
	const { register, setValue } = useForm();

	const initializeStates = () => {
		const total = cartState?.reduce((subTotal, { price, quantity }) => subTotal + (price * quantity), 0);
		const subTotalTax = total * TAX.IVA;
		setSubTotalCartState(total);
		setTaxCartState(subTotalTax);
		setTotalCartState(total + subTotalTax);
	}

	const handleAddProduct = (product: Product) => {
		const quantity = addToCart(product);
		setValue(`product-${product.id}`, quantity);
	}

	const handleRemoveProductQuantity = (id: number) => {
		const quantity = removeFromCart(id);
		setValue(`product-${id}`, quantity);
	}

	const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
		let value = parseInt(e.target.value);
		if (!value  || value < 1) {
			value = 1;
		}
		setValue(`product-${id}`, value);
		changeProductQuantity(id, value);
	}

	const handleRemoveProduct = (id: number) => {
		removeProduct(id);
	}

	const handleRemoveAllProducts = () => {
		removeAllProducts();
	}

	useEffect(() => {
		initializeStates();
	}, [cartState]);

	return (
		<>
			<div>
				<Link href="/">
					<a className="flex text-green-500">
						<ArrowLeftIcon className="h-6 w-6" />
						<span className="pl-2 text-sm">Regresar</span>
					</a>
				</Link>
			</div>
			{
				cartState?.length > 0 ? (
					<div className="flex flex-wrap flex-col md:flex-row">
						<div className="px-10 w-full lg:w-3/4">
							<div className="flex justify-between border-b pb-3">
								<h1 className="font-semibold text-2xl">
									Carrito de compra
								</h1>
								<div>
									<h2 className="font-bold text-2xl">
										{cartState?.length} items
									</h2>
									{
										cartState?.length > 0 && (
											<button className="flex items-center px-2 rounded border-2 border-red-300 text-xs text-red-300 hover:bg-red-600 hover:border-red-600 hover:text-red-600 hover:text-white" type="button" onClick={handleRemoveAllProducts}>
												<TrashIcon className="h-6 w-6" />Limpiar carrito
											</button>
										)
									}
								</div>
							</div>
							<div className="hidden md:grid grid-cols-5 gap-3 py-3">
								<h3 className="md:col-span-2">Producto</h3>
								<h3>Cantidad</h3>
								<h3>Precio unitario</h3>
								<h3>Total</h3>
							</div>
							{
								cartState?.map((product) => (
									<div className="grid grid-cols-3 py-4 border-b md:grid-cols-5 gap-5" key={product.id}>
										<div className="col-span-full md:col-span-2">
											<div className="flex flex-col items-center md:flex-row md:items-start">
												<div className="md:w-2/5">
													<img className="hidden h-auto md:block" src={product.cover} alt="" />
												</div>
												<div className="w-full md:w-3/5 pl-2">
													<h3 className="font-semibold text-sm truncate">{product.name}</h3>
													<button className="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => handleRemoveProduct(product.id)}>Eliminar</button>
												</div>
											</div>
										</div>
										<div className="flex flex-col items-center md:items-start">
											<span className="font-bold md:hidden">Cantidad: </span>
											<div>
												<button className="w-4" onClick={() => handleRemoveProductQuantity(product.id)}>-</button>
												<input className="mx-1 border text-center w-8" type="number" min="1" pattern="\d*" defaultValue={product.quantity} {...register(`product-${product.id}`)} onBlur={(event) => handleChangeProduct(event, product.id)} />
												<button className="w-4" onClick={() => handleAddProduct(product)}>+</button>
											</div>
										</div>
										<div className="flex flex-col items-center md:items-start">
											<span className="font-bold lg:hidden">Precio: </span>
											{product.price}
										</div>
										<div className="flex flex-col items-center md:items-start">
											<span className="font-bold lg:hidden">Total: </span>
											{(product.price * product.quantity).toFixed(2)}
										</div>
									</div>

								))
							}
						</div>
						<div className="px-1 w-full lg:w-1/4">
							<div className="lg:sticky top-24">
								<div className="flex justify-between py-4">
									<h3 className="font-light text-sm">
										Productos
									</h3>
									<h3 className="font-bold text-sm">
										$ {subTotalCartState?.toFixed(2)}
									</h3>
								</div>
								<div className="flex justify-between  py-4 border-b">
									<h3 className="font-light text-sm">
										IVA
									</h3>
									<h3 className="font-bold text-sm">
										$ {taxCartSate.toFixed(2)}
									</h3>
								</div>
								<div className="flex justify-between  py-4">
									<h3 className="font-bold text-md">
										Total:
									</h3>
									<h3 className="font-bold text-sm">
										$ {totalCartState.toFixed(2)}
									</h3>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="flex flex-col md:flex-col">
						<div className="px-10 py-10 w-full">
							<div className="flex justify-center border-b pb-3">
								<h2 className="font-semibold text-2xl">
									No hay productos en el carrito
								</h2>
							</div>
						</div>

					</div>
				)
			}
		</>
	);
}

export default Cart;
