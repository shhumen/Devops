import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import routes from "./route.config";

const Router = () => {
const router = createBrowserRouter(routes);
return <RouterProvider router={router} />;
};

export default Router;
