import Chat from "../components/Chat/Chat";
import Join from "../components/Room/Join";
import Launch from "../components/Room/Launch";

// url paths for this application
export const routePath = {
  signIn: "/",
  signUp: "/sign-up",
  selectRoom: "/select-room",
  createRoom: "/create-room",
  chat: "/chat",
};

const routes = [
  {
    path: routePath.chat,
    Component: Chat,
  },
  {
    path: routePath.selectRoom,
    Component: Join,
  },
  {
    path: routePath.createRoom,
    Component: Launch,
  },
];

export default routes;
