import { createContext, useState } from "react";

export const NotificationsContext = createContext({
    notifications: [],
    loading: null
})

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    return (
        <NotificationsContext.Provider value={{ notifications, setNotifications, loading, setLoading }}>
            { children }
        </NotificationsContext.Provider>
    )
}