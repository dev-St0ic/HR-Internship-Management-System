import { Outlet } from 'react-router-dom';

export default function Header() {
  return (
    <div className="row w-full">
        <header className="h-30 border-b border-slate-200 flex items-center px-5">
          <h1 className="font-medium text-lg">Dashboard</h1>
        </header>
        
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet /> 
        </main>
      </div>
  );
}