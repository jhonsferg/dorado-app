import { employeeService } from "@/services/api/employee.ts";

export const createEmployeeSlice = (set: any, get: any, _: any) => ({
  // Estado de empleados
  employees: [],
  selectedEmployee: null,

  // Estados de carga
  isLoadingEmployees: false,
  isLoadingEmployee: false,
  isSavingEmployee: false,
  isDeletingEmployee: false,

  // Error handling
  employeeError: null,

  // ACCIONES PARA EMPLEADOS
  fetchEmployees: async () => {
    set({ isLoadingEmployees: true, employeeError: null });
    try {
      const employees = await employeeService.getAll();
      set({
        employees,
        isLoadingEmployees: false
      });
      return employees;
    } catch (error: any) {
      set({
        employeeError: error.message,
        isLoadingEmployees: false
      });
      throw error;
    }
  },

  fetchEmployeeById: async (id: any) => {
    set({ isLoadingEmployee: true, employeeError: null });
    try {
      const employee = await employeeService.getById(id);
      set({
        selectedEmployee: employee,
        isLoadingEmployee: false
      });
      return employee;
    } catch (error: any) {
      set({
        employeeError: error.message,
        isLoadingEmployee: false
      });
      throw error;
    }
  },

  createEmployee: async (employeeData: any) => {
    set({ isSavingEmployee: true, employeeError: null });
    try {
      const newEmployee = await employeeService.create(employeeData);
      const { employees } = get();
      set({
        employees: [...employees, newEmployee],
        isSavingEmployee: false
      });
      return newEmployee;
    } catch (error: any) {
      set({
        employeeError: error.message,
        isSavingEmployee: false
      });
      throw error;
    }
  },

  updateEmployee: async (id: any, employeeData: any) => {
    set({ isSavingEmployee: true, employeeError: null });
    try {
      const updatedEmployee = await employeeService.update(id, employeeData);
      const { employees } = get();
      set({
        employees: employees.map((e: any) => e.id === id ? updatedEmployee : e),
        selectedEmployee: updatedEmployee,
        isSavingEmployee: false
      });
      return updatedEmployee;
    } catch (error: any) {
      set({
        employeeError: error.message,
        isSavingEmployee: false
      });
      throw error;
    }
  },

  deleteEmployee: async (id: any) => {
    set({ isDeletingEmployee: true, employeeError: null });
    try {
      await employeeService.delete(id);
      const { employees } = get();
      set({
        employees: employees.filter((e: any) => e.id !== id),
        selectedEmployee: null,
        isDeletingEmployee: false
      });
    } catch (error: any) {
      set({
        employeeError: error.message,
        isDeletingEmployee: false
      });
      throw error;
    }
  },

  // UTILIDADES
  clearSelectedEmployee: () => set({ selectedEmployee: null }),
  clearEmployeeError: () => set({ employeeError: null }),

  getEmployeesByRole: (role: any) => {
    const { employees } = get();
    return employees.filter((employee: any) =>
      employee.roles?.includes(role)
    );
  },

  getEmployeesByBranch: (branchId: any) => {
    const { employees } = get();
    return employees.filter((employee: any) =>
      employee.branchId === branchId
    );
  },
});
