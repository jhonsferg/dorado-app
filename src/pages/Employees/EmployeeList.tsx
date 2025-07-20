import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useEmployee } from '@/hooks/useEmployee';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const { fetchEmployees } = useEmployee();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await fetchEmployees();
        setEmployees(employees);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='grid grid-cols-2 gap-4'>
      {employees.length > 0 ? (
        employees.map(employee => (
          <div
            key={employee.id}
            className='bg-white p-4 rounded-md flex flex-col gap-2 shadow-md'
          >
            <div className='flex flex-row justify-center items-center'>
              <div className='bg-stone-200 w-20 h-20 rounded-full flex flex-row justify-center items-center'>
                <FontAwesomeIcon icon={faUser} className='text-4xl' />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-center font-bold'>{employee.name}</p>
              <p className='text-center text-stone-700'>{employee.phone}</p>
              <p className='text-center font-bold text-red-400'>
                {employee.position}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className='text-red-500 font-bold'>No hay empleados registrados</p>
      )}
    </div>
  );
};

export default EmployeeList;
