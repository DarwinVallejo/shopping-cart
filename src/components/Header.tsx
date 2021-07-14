import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import CartContext from '../context/CartContext'
import { useContext } from 'react'

const Header = () => {
    const { cartState } = useContext(CartContext)
    return (
        <nav className="sticky top-0 z-50 bg-white px-12 shadow-md ">
            <div className="relative flex items-center justify-between h-14">
                <div className="flex items-center">
                    <h1 className="text-green-600 text-2xl font-bold">
                        <Link href="/">
                        <a>UREM</a>
                        </Link>
                    </h1>
                </div>
                <div className="flex items-center">
                    <span className="rounded-full bg-green-600 text-white text-xs ml-1 px-1 self-start">{cartState?.length}</span>
                    <Link href="/cart">
                        <a className="flex justify-between">
                            <ShoppingCartIcon className="h-6 w-6 text-blue-600"/>
                            <span className="text-blue-600 text-sm">
                                Ver carrito
                            </span>
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Header

