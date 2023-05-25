import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./router/AppRoutes";
import {AppProvider} from "./context/AppProvider";
import {AuthProvider} from "./context/AuthContext/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
