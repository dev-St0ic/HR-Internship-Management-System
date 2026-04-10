import Header from '../Header';
import Sidebar from '../../../../common/components/layout/Sidebar';
import {navigation} from '../../../../common/config/navigation';

const SupervisorLayout = () => {
  const userRole = "supervisor";

  return (
    <div className="flex min-h-screen">
      <Sidebar links={navigation[userRole]} />
      <div className="flex-1 ml-60">
        <Header />  
      </div>
    </div>
  );
};

export default SupervisorLayout;