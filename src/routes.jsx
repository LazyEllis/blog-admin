import { Navigate } from "react-router-dom";
import Layout from "./routes/Layout";
import Auth from "./routes/Auth";
import Error from "./routes/Error";
import Home from "./routes/Home";
import Post from "./routes/Post";

const routes = (isAuth) => [
  {
    path: "/",
    element: isAuth ? <Layout /> : <Navigate to="/sign-in" />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/posts/:id", element: <Post /> },
    ],
  },
  {
    path: "/sign-in",
    element: !isAuth ? <Auth /> : <Navigate to="/" />,
  },
];

export default routes;
