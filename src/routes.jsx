import Layout from "./routes/Layout";
import Auth from "./routes/Auth";
import Error from "./routes/Error";
import Home from "./routes/Home";
import Post from "./routes/Post";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/posts/:id", element: <Post /> },
    ],
  },
  {
    path: "/sign-in",
    element: <Auth />,
  },
];

export default routes;
