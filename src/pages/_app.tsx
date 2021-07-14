import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'tailwindcss/tailwind.css'
import Header from '../components/Header'
import CarContext from '../context/CartContext';
import useCart from '../hooks/useCart';
import '../style/base.css'

const MyApp = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();
  const useCar = useCart();
  return (
    <CarContext.Provider value={useCar}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="mx-auto py-2">
          <div className="container mx-auto px-2  pt-5 sm:px-2 lg:px-12">
            <Component {...pageProps} />
          </div>
        </div>
      </QueryClientProvider>

    </CarContext.Provider>
    )
}

export default MyApp
