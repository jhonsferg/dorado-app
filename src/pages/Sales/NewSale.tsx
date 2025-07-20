import * as uuid from 'uuid';
import {
  faCheck,
  faPlus,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { useSales } from '@/hooks/useSales';
import { ROUTES } from '@/utils/constants/routes';
import { useProducts } from '@/hooks/useProduct';
import { useAuth } from '@/hooks/useAuth';
import { decimal, titlecase } from '@/utils/helpers/formatters';

dayjs.extend(utc);
dayjs.extend(timezone);

const TABLE_HEADS = ['Nombre', 'Categoría', 'Tamaño', 'Precio unitario', ''];

const NewSale = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>([]);
  const [totalPriceBeforeIgv, setTotalPriceBeforeIgv] = useState<number>(0);
  const [totalIgvAmount, setTotalIgvAmount] = useState<number>(0);
  const [formData, setFormData] = useState({ names: '', phone: '' });

  const { createSale } = useSales();
  const { fetchProducts } = useProducts();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    loadProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let currentTotalPrice = 0;
    items.forEach(item => {
      currentTotalPrice += item.price;
    });
    setTotalPriceBeforeIgv(currentTotalPrice);
    setTotalIgvAmount(currentTotalPrice * 0.18);
  }, [items]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleItemSelected = useCallback((item: any) => {
    setModal(false);
    setItems(prevItems => [{ ...item, listId: uuid.v4() }, ...prevItems]);
  }, []);

  const handleItemDelete = useCallback((itemToDelete: any) => {
    setItems(prevItems =>
      prevItems.filter(item => item.listId !== itemToDelete.listId)
    );
  }, []);

  const onReject = useCallback(() => {
    navigate(ROUTES.SALES);
  }, [navigate]);

  const onSubmit = useCallback(async () => {
    const preparedItems = items.map((item: any) => ({
      productName: item.name,
      quantity: 1,
      subtotal: item.price,
      unitPrice: item.price,
    }));
    const saleDate = dayjs().tz('America/Lima').toDate();

    const payload = {
      date: saleDate,
      customerName: formData.names,
      customerPhone: formData.phone,
      items: preparedItems,
      igv: totalIgvAmount,
      total: totalPriceBeforeIgv + totalIgvAmount,
      paymentMethod: 'EFECTIVO',
      employeeId: user?.id,
      subtotal: totalPriceBeforeIgv,
    };

    if (!formData.names || !formData.phone || items.length === 0) {
      alert(
        'Por favor, completa los datos del cliente y agrega al menos un producto.'
      );
      return;
    }

    try {
      const sale = await createSale(payload);
      console.log('Venta registrada con éxito:', sale);
      navigate(ROUTES.SALES);
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      alert('Hubo un error al registrar la venta. Inténtalo de nuevo.');
    }
  }, [
    items,
    formData.names,
    formData.phone,
    totalIgvAmount,
    totalPriceBeforeIgv,
    user?.id,
    createSale,
    navigate,
  ]);

  return (
    <div className='flex flex-col gap-4'>
      <fieldset className='border-2 rounded-md border-gray-300 p-4'>
        <legend>Datos del cliente</legend>
        <div className='flex flex-col gap-4'>
          <Input
            label='Nombres'
            required
            name='names'
            value={formData.names}
            onChange={handleChange}
            placeholder='Nombre del cliente'
          />
          <Input
            label='Celular'
            required
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Celular del cliente'
          />
        </div>
      </fieldset>
      <fieldset className='border-2 rounded-md border-gray-300 p-4'>
        <legend className='font-medium text-gray-700 mb-1'>
          Datos de venta
        </legend>
        <div className='flex flex-row'>
          <button
            className='flex flex-row gap-4 items-center bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-500'
            onClick={() => setModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className='text-sm font-medium'>Agregar producto</span>
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
        </div>

        {items.length > 0 ? (
          <div className='pt-8'>
            <table className='w-full table-auto text-left'>
              <thead>
                <tr>
                  {TABLE_HEADS.map((head: string) => (
                    <th
                      key={head}
                      className='border-b border-gray-200 bg-gray-100 p-4'
                    >
                      <span className='font-normal leading-none opacity-70'>
                        {head}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item: any) => {
                  const classes = 'p-4 border-b border-blue-gray-50'; // Simplificado
                  return (
                    <tr key={item.listId}>
                      {' '}
                      <td className={classes}>
                        <span className='font-normal'>{item.name}</span>
                      </td>
                      <td className={classes}>
                        <span className='font-normal'>
                          {titlecase(item.category)}
                        </span>
                      </td>
                      <td className={classes}>
                        <span className='font-normal'>
                          {titlecase(item.size)}
                        </span>
                      </td>
                      <td className={classes}>
                        <span className='font-normal'>
                          S/. {decimal(item.price)}
                        </span>
                      </td>
                      <td className={classes}>
                        <button
                          className='bg-red-200 text-red-900 w-10 h-10 rounded-full cursor-pointer hover:bg-red-100'
                          onClick={() => handleItemDelete(item)} // Pasa solo el item
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className='pt-8 flex justify-end gap-16'>
              <div className='flex flex-row gap-2 items-center'>
                <span className='font-bold text-lg'>Precio Neto:</span>
                <span className='text-gray-700 font-bold'>
                  S/. {decimal(totalPriceBeforeIgv)}
                </span>
              </div>
              <div className='flex flex-row gap-2 items-center'>
                <span className='font-bold text-lg'>IGV (18%):</span>
                <span className='text-gray-700 font-bold'>
                  S/. {decimal(totalIgvAmount)}
                </span>
              </div>
              <div className='flex flex-row gap-2 items-center'>
                <span className='font-bold text-lg'>Precio total:</span>
                <span className='text-gray-700 font-bold'>
                  S/. {decimal(totalPriceBeforeIgv + totalIgvAmount)}
                </span>
              </div>
            </div>

            <div className='flex justify-end gap-4 pt-8'>
              <button
                className='flex flex-row items-center gap-2 text-white bg-red-500 py-2 px-4 rounded cursor-pointer hover:bg-red-400'
                onClick={onReject}
              >
                <FontAwesomeIcon icon={faXmark} />
                <span className='font-bold'>Cancelar</span>
              </button>
              <button
                className='flex flex-row items-center gap-2 text-white bg-green-700 py-2 px-4 rounded cursor-pointer hover:bg-green-500'
                onClick={onSubmit}
              >
                <FontAwesomeIcon icon={faCheck} />
                <span className='font-bold'>Registrar venta</span>
              </button>
            </div>
          </div>
        ) : (
          <p className='py-4 text-center text-stone-400 font-bold'>
            No hay items registrados
          </p>
        )}
      </fieldset>
    </div>
  );
};

export default NewSale;
