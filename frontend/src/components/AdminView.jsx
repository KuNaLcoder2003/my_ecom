import React, { useEffect, useState } from 'react'

const AdminView = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        try {
            setLoading(true);
            fetch('http://localhost:3000/api/v1/product', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response) => {
                const data = await response.json();
                if (data.valid) {
                    setProducts(data.products)
                    setLoading(false);
                } else {
                    setLoading(false);
                    console.log(response.message);
                }

            })
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }, [])
    return (
        <div className="w-full px-4 py-6">
            <div className="max-w-7xl h-[500px]  mx-auto bg-white rounded-lg shadow-lg overflow-x-hidden overflow-y-auto">
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] p-4 space-y-4">
                        {/* Table Headers */}
                        <div className="grid grid-cols-5 gap-4 font-semibold pb-2">
                            <div>Product ID</div>
                            <div>Product Name</div>
                            <div>Price</div>
                            <div>Stock</div>
                            <div>Link</div>
                        </div>

                        {/* Table Rows */}
                        {loading ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-4">No Products to show</div>
                        ) : (
                            products.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-5 gap-20 w-[100%] md:gap-4 border-b py-2 text-sm md:text-base"
                                >
                                    <div className='truncate'>{item.id}</div>
                                    <div>{item.name}</div>
                                    <div>{item.price}</div>
                                    <div>{item.stock}</div>
                                    <div>
                                        <a
                                            href={`/product/${item.id}`}
                                            className="text-indigo-600 underline"
                                        >
                                            View Item
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminView
