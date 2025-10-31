import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import routes from "./routes";

const App = () => {
  const { isAuth } = useAuth();

  const router = createBrowserRouter(routes(isAuth));

  return <RouterProvider router={router} />;
};

export default App;
