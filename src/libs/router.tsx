import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Question1 from "../pages/landingPage/Question1";
import { LINK_HOME, QUESTION_1, QUESTION_2, QUESTION_3 } from "./constant";
import Question2 from "../pages/landingPage/Question2";
import Question3 from "../pages/landingPage/Question3";

export const router = createBrowserRouter([
  {
    path: LINK_HOME,
    element: <App />,
    children: [
      {
        path: QUESTION_1,
        index: true,
        element: <Question1 />,
      },
      {
        path: QUESTION_2,
        index: true,
        element: <Question2 />,
      },
      {
        path: QUESTION_3,
        index: true,
        element: <Question3 />,
      },
    ],
  },
]);
