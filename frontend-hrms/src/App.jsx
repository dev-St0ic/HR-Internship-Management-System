import { AppRouter } from "./routes/AppRouter";
import { useEffect } from "react";
import { AttendanceProvider } from "./contexts/AttendanceProvider";
import { initializeMockDatabase } from "./common/utils/mockAuth";
import { AuthProvider } from "./contexts/AuthContext";

function App() {

  useEffect(() => {
    initializeMockDatabase();
  }, []);

  return (
    <AuthProvider>
      <AttendanceProvider>
        <AppRouter />
      </AttendanceProvider>
    </AuthProvider>
  );
}

export default App;
