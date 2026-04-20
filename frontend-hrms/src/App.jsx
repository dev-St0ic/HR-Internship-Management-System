import { AppRouter } from "./routes/AppRouter";
import { ThemeProvider } from "./common/theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
