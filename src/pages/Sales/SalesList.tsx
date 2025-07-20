import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useSales } from '@/hooks/useSales';
import { parseDate } from '@/utils/helpers/dates';
import { titlecase } from '@/utils/helpers/formatters';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants/routes';

const TABLE_HEADS = ['Nombre', 'Cantidad', 'Precio unitario', 'Sub total'];

const SalesList = () => {
  const navigator = useNavigate();
  const [sales, setSales] = useState<any[]>([]);
  const { fetchSales } = useSales();

  const { isCashier } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sales = await fetchSales();
        setSales(sales);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [fetchSales]);

  const handleNewSale = () => {
    navigator(ROUTES.SALE_NEW);
  };

  return (
    <div className='grid grid-cols-1 gap-4 overflow-y-auto'>
      {isCashier() && (
        <div className='flex flex-row justify-end'>
          <button
            className='bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-green-400'
            onClick={handleNewSale}
          >
            Nueva venta
          </button>
        </div>
      )}
      {sales.length > 0 ? (
        sales.map((sale: any) => (
          <div
            key={sale.id}
            className='bg-white shadow-md p-4 rounded-md flex flex-col gap-4'
          >
            <div className='grid grid-cols-3 gap-6'>
              <div className='flex flex-row gap-2'>
                <span className='font-bold'>Cliente:</span>
                <span className='text-gray-700'>
                  {titlecase(sale.customerName)}
                </span>
              </div>
              <div className='flex flex-row gap-2'>
                <span className='font-bold'>Celular:</span>
                <span className='text-gray-700'>{sale.customerPhone}</span>
              </div>
              <div className='flex flex-row gap-2'>
                <span className='font-bold'>Fecha y hora:</span>
                <span className='text-gray-700'>{parseDate(sale.date)}</span>
              </div>
              <div className='flex flex-row gap-2'>
                <span className='font-bold'>Método de pago:</span>
                <span className='text-gray-700'>
                  {titlecase(sale.paymentMethod)}
                </span>
              </div>
              <div className='flex flex-row gap-2'>
                <span className='font-bold'>IGV:</span>
                <span className='text-gray-700'>S/. {sale.igv}</span>
              </div>
              <div className='flex flex-row gap-2'>
                <span className='font-bold'>Sub total:</span>
                <span className='text-gray-700'>S/. {sale.subtotal}</span>
              </div>
              <div className='flex flex-row gap-2'>
                <span className='font-bold'>Total:</span>
                <span className='text-gray-700'>S/. {sale.total}</span>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='text-center font-bold'>Productos vendidos</p>
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
                  {sale.items.map((item: any, index: number) => {
                    const isLast = index === sale.items.length - 1;
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';
                    return (
                      <tr key={item.productId}>
                        <td className={classes}>
                          <span className='font-normal'>
                            {item.productName}
                          </span>
                        </td>
                        <td className={classes}>
                          <span className='font-normal'>{item.quantity}</span>
                        </td>
                        <td className={classes}>
                          <span className='font-normal'>
                            S/. {item.unitPrice}
                          </span>
                        </td>
                        <td className={classes}>
                          <span className='font-normal'>
                            S/. {item.subtotal}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <p>No hay ventas registradas</p>
      )}
    </div>
  );
};

export default SalesList;
