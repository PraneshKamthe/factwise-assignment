import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  age: number;
  location: string;
  performanceRating: number;
  projectsCompleted: number;
  isActive: boolean;
  skills: string[];
  manager: string | null;
}

interface EmployeeGridProps {
  data: Employee[];
}

export const EmployeeGrid = ({ data }: EmployeeGridProps) => {
  const columnDefs: ColDef<Employee>[] = useMemo(() => [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      pinned: 'left',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 130,
      pinned: 'left',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 130,
      pinned: 'left',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 230,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 140,
      filter: 'agTextColumnFilter',
      cellStyle: (params) => {
        const colors: Record<string, string> = {
          'Engineering': '#dbeafe',
          'Marketing': '#fce7f3',
          'Sales': '#dcfce7',
          'HR': '#fef3c7',
          'Finance': '#e0e7ff',
        };
        return {
          backgroundColor: colors[params.value] || '#f3f4f6',
          fontWeight: '500',
        };
      },
    },
    {
      field: 'position',
      headerName: 'Position',
      width: 180,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'salary',
      headerName: 'Salary',
      width: 130,
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => {
        return params.value ? `$${params.value.toLocaleString()}` : '';
      },
      cellStyle: { fontWeight: '600', color: '#059669' },
    },
    {
      field: 'hireDate',
      headerName: 'Hire Date',
      width: 130,
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : '';
      },
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 90,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 130,
      filter: 'agTextColumnFilter',
    },
    {
      field: 'performanceRating',
      headerName: 'Performance',
      width: 140,
      filter: 'agNumberColumnFilter',
      cellStyle: (params) => {
        const rating = params.value;
        if (rating >= 4.5) return { color: '#059669', fontWeight: '600' };
        if (rating >= 4.0) return { color: '#0284c7', fontWeight: '600' };
        return { color: '#f59e0b', fontWeight: '600' };
      },
      valueFormatter: (params) => {
        return params.value ? `${params.value.toFixed(1)} ★` : '';
      },
    },
    {
      field: 'projectsCompleted',
      headerName: 'Projects',
      width: 110,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 110,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: { value: boolean }) => {
        return params.value ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inactive
          </span>
        );
      },
    },
    {
      field: 'skills',
      headerName: 'Skills',
      width: 250,
      filter: 'agTextColumnFilter',
      valueFormatter: (params) => {
        return params.value ? params.value.join(', ') : '';
      },
    },
    {
      field: 'manager',
      headerName: 'Manager',
      width: 150,
      filter: 'agTextColumnFilter',
      valueFormatter: (params) => {
        return params.value || 'Executive';
      },
    },
  ], []);

  const defaultColDef: ColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    floatingFilter: true,
  }), []);

  return (
    <div className="ag-theme-alpine w-full" style={{ height: '600px' }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={20}
        animateRows={true}
        rowSelection="multiple"
        suppressRowClickSelection={true}
      />
    </div>
  );
};
