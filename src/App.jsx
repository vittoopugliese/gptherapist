import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./router/AppRoutes";
import {AppProvider} from "./context/AppProvider";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
