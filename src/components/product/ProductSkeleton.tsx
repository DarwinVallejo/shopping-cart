const ProductSkeleton = () => {
    const skeletonQuantity = 10;
    return (
        <>
            {
                [...Array(skeletonQuantity)].map((_, index) => (
                    <div className="w-full max-w-sm mx-auto rounded-md shadow-md sm:mx-3" key={index}>
                        <div className="sm:h-60 lg:h-56 bg-gray-300 " />
                        <div className="px-5 py-2">
                            <div className="bg-gray-200 rounded w-3/4"></div>
                            <div className="py-2 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ProductSkeleton
