import { useProducts } from '@/hooks/useProduct';
import { useEffect, useState } from 'react';
import { decimal } from '@/utils/helpers/formatters';

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);

  const { fetchProducts } = useProducts();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        console.log(products);
        setProducts(products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='grid grid-cols-3 gap-4'>
      {products.length > 0 ? (
        products.map(product => (
          <div
            key={product.id}
            className='flex flex-col bg-white shadow-md p-4 rounded-md cursor-pointer'
          >
            <div className='font-bold'>{product.name}</div>
            <div className='flex flex-row justify-between'>
              <div className='flex gap-1'>
                <span className='text-stone-600'>Precio:</span>
                <span className='text-green-800 font-bold'>
                  s/. {decimal(product.price)}
                </span>
              </div>
              <div className='flex gap-1'>
                <span className='text-stone-600'>Stock:</span>
                <span className='text-orange-800 font-bold'>
                  {product.stock}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='col-span-3'>No hay productos</p>
      )}
    </div>
  );
};

export default ProductList;
