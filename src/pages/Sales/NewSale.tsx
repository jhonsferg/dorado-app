import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { useSales } from '@/hooks/useSales';
import { useProducts } from '@/hooks/useProduct';
import { decimal } from '@/utils/helpers/formatters';

const NewSale = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const { fetchSales } = useSales();
  const { fetchProducts } = useProducts();

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, []);

  const handleItemSelected = item => {
    setModal(false);
    console.log(item);
  };

  return (
    <div className='flex flex-col gap-4'>
      <fieldset className='border-2 rounded-md border-gray-300 p-4'>
        <legend>Datos del cliente</legend>
        <div className='flex flex-col gap-4'>
          <Input label='Nombres' />
          <Input label='Celular' />
        </div>
      </fieldset>
      <fieldset className='border-2 rounded-md border-gray-300 p-4'>
        <legend className='font-medium text-gray-700 mb-1">'>
          Datos de venta
        </legend>
        <button
          className='flex flex-row gap-4 items-center bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-500'
          onClick={() => setModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className='text-sm font-medium'>Agregar venta</span>
        </button>
        <Modal
          title='Agregar producto'
          isOpen={modal}
          onClose={() => setModal(false)}
        >
          <div className='flex flex-col gap-0 h-40 overflow-y-auto'>
            {products.length > 0 ? (
              products.map(product => (
                <button
                  key={product.id}
                  className='hover:bg-gray-200 text-gray-800 py-2 px-4 text-left cursor-pointer flex flex-row justify-between'
                  onClick={() => handleItemSelected(product)}
                >
                  <span>{product.name}</span>
                  <span>S/. {decimal(product.price)}</span>
                </button>
              ))
            ) : (
              <p>No hay productos registrados</p>
            )}
          </div>
        </Modal>
      </fieldset>
    </div>
  );
};

export default NewSale;
