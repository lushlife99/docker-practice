import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Join from "./login/Join";
import Login from "./login/Login";
import Start from "./Start";
import Game from "./game/Game";
import GameRoom from "./game/GameRoom";
import UserProfile from "./user/UserProfile";
import HandHistory from "./handHistory/HandHistory";
import Hud from "./user/Hud";
import Main from "./login/Main";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Start />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/main",
        element: <Main />,
      },

      {
        path: "/game",
        element: <Game />,
      },
      {
        path: "/gameRoom",
        element: <GameRoom />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/handHistory",
        element: <HandHistory />,
      },
      {
        path: "/hud",
        element: <Hud />,
      },
    ],
  },
]);

export default router;
