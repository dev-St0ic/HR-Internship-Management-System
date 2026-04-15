import { AppRouter } from "./routes/AppRouter";
import { AttendanceProvider } from "./contexts/AttendanceProvider";

function App() {
  return (
    <AttendanceProvider>
      <AppRouter />
    </AttendanceProvider>
  );
}

export default App;
