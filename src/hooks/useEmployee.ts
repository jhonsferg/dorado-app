import { useStore } from '@/store';

export const useEmployee = () => {
  const employees = useStore((state: any) => state.employees);
  const selectedEmployee = useStore((state: any) => state.selectedEmployee);
  const isLoadingEmployee = useStore((state: any) => state.isLoadingEmployee);
  const isLoadingEmployees = useStore((state: any) => state.isLoadingEmployees);
  const isSavingEmployee = useStore((state: any) => state.isSavingEmployee);
  const isDeletingEmployee = useStore((state: any) => state.isDeletingEmployee);
  const employeeError = useStore((state: any) => state.employeeError);

  const fetchEmployees = useStore((state: any) => state.fetchEmployees);
  const fetchEmployeeById = useStore((state: any) => state.fetchEmployeeById);
  const createEmployee = useStore((state: any) => state.createEmployee);
  const updateEmployee = useStore((state: any) => state.updateEmployee);
  const deleteEmployee = useStore((state: any) => state.deleteEmployee);

  const clearSelectedEmployee = useStore(
    (state: any) => state.clearSelectedEmployee
  );
  const clearEmployeeError = useStore((state: any) => state.clearEmployeeError);
  const getEmployeesByRole = useStore((state: any) => state.getEmployeesByRole);
  const getEmployeesByBranch = useStore(
    (state: any) => state.getEmployeesByBranch
  );

  return {
    employees,
    selectedEmployee,
    isLoadingEmployee,
    isLoadingEmployees,
    fetchEmployees,
    fetchEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    clearSelectedEmployee,
    clearEmployeeError,
    getEmployeesByRole,
    getEmployeesByBranch,
    isSavingEmployee,
    isDeletingEmployee,
    employeeError,
  };
};
