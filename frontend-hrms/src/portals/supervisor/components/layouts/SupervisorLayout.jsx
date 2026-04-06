import Header from '../Header';
import Sidebar from '../Sidebar';

const SupervisorLayout = () => {
  return (
    <div className="container mx-auto flex min-h-screen">
      <Sidebar />
      <Header />
    </div>
  );
};

export default SupervisorLayout;