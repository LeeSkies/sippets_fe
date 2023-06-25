import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'
import { UserContext } from './userContext'
import instance from "../services/axios";

export const WebsocketContext = createContext({
    socket: null,
    auth: null,
    conversations: [],
})

export const WebsocketProvider = ({ children }) => {
    const [socket, setSocket] = useState()
    const [auth, setAuth] = useState(() => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 150; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      })
    const [conversations, setConversations] = useState([])
    const [currentReceiver, setCurrentReceiver] = useState(null)

    const { user } = useContext(UserContext)

    const fetchConversations = async () => {
        const { data } = await instance.get('/protected/conversation/all', { withCredentials: true })
        setConversations(data)
    }

    useEffect(() => {
        let connection;
        if (user?._id) {
            connection = io(, { query: { userId: user._id, handshakeString: auth } });
            connection.connect();
            setSocket(connection);
            fetchConversations()
        }
        return () => {
            if (connection) {
                connection.close();
            }
        };
    }, [user]);
    

    return (
        <WebsocketContext.Provider value={{ socket, auth, conversations, currentReceiver, setCurrentReceiver }}>
            {children}
        </WebsocketContext.Provider>
    )
}