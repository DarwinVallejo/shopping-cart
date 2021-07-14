import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'tailwindcss/tailwind.css'
import Header from '../components/Header'
import CarContext from '../context/CartContext';
import useCart from '../hooks/useCart';

const MyApp = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();
  const useCar = useCart();
  return (
    <CarContext.Provider value={useCar}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="mx-auto pt-5 bg-gray-50">
          <div className="container mx-auto py-12 px-2 sm:px-2 lg:px-12">
            <Component {...pageProps} />
          </div>
        </div>
      </QueryClientProvider>

    </CarContext.Provider>
    )
}

export default MyApp
