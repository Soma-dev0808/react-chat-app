import { routePath } from "../service/routes"
import Chat from "../components/Chat/Chat"
import Join from "../components/Join/Join"
import Launch from "../components/Join/Launch"
import SetUserName from "../components/Join/SetUserName"

export default [
    {
        path: routePath.chat,
        Component: Chat
    },
    {
        path: routePath.selectRoom,
        Component: Join
    },
    {
        path: routePath.createRoom,
        Component: Launch
    },
    {
        path: routePath.setUserName,
        Component: SetUserName
    }
]