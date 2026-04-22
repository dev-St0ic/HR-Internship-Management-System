import { useAuth } from '../../../contexts/useAuth';
import GreetingHeader from '../../../common/components/ui/GreetingHeader';

export default function SupervisorDashboard() {
  const { currentUser } = useAuth();
  const userName = currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : "Supervisor";

  return (
    <div id="supervisor-dashboard" className="p-6">
      <GreetingHeader name={userName} />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">My Interns</h3>
          <p className="text-3xl font-bold text-[#7C3EFF] mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Active Tasks</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Pending Evaluations</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-medium">Attendance Issues</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}
