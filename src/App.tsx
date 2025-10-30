import { useMemo } from 'react';
import { Users, Building2, DollarSign, TrendingUp } from 'lucide-react';
import { employeesData } from './data/employees';
import { StatsCard } from './components/StatsCard';
import { EmployeeGrid } from './components/EmployeeGrid';

function App() {
  const stats = useMemo(() => {
    const employees = employeesData.employees;
    const activeEmployees = employees.filter(e => e.isActive).length;
    const departments = new Set(employees.map(e => e.department)).size;
    const avgSalary = Math.round(
      employees.reduce((sum, e) => sum + e.salary, 0) / employees.length
    );
    const avgRating = (
      employees.reduce((sum, e) => sum + e.performanceRating, 0) / employees.length
    ).toFixed(2);

    return { activeEmployees, departments, avgSalary, avgRating };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of company workforce data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Employees"
            value={stats.activeEmployees}
            icon={Users}
            iconColor="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatsCard
            title="Departments"
            value={stats.departments}
            icon={Building2}
            iconColor="text-emerald-600"
            bgColor="bg-emerald-50"
          />
          <StatsCard
            title="Avg Salary"
            value={`$${stats.avgSalary.toLocaleString()}`}
            icon={DollarSign}
            iconColor="text-amber-600"
            bgColor="bg-amber-50"
          />
          <StatsCard
            title="Avg Performance"
            value={`${stats.avgRating} ★`}
            icon={TrendingUp}
            iconColor="text-rose-600"
            bgColor="bg-rose-50"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Employee Directory</h2>
            <p className="text-sm text-gray-600">
              Filter, sort, and analyze employee data. Use column filters for advanced searching.
            </p>
          </div>
          <EmployeeGrid data={employeesData.employees} />
        </div>
      </div>
    </div>
  );
}

export default App;
