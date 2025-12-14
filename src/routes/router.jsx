import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <div> This is Root </div>,
    children: [
        {
            index: true, 
            element: <div> This is home </div>
        }
    ]
  },
]);