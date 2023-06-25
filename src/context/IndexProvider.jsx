import React from 'react'
import { CommentProvider } from './commentContext'
import { ToastContainer } from 'react-toastify'
import { NotificationsProvider } from './notificationsContext'
import { SippetsProvider } from './sippetsContext'
import { WebsocketProvider } from './websocketContext'

export const IndexProvider = ({children}) => {
  return (
    // <WebsocketProvider>
    <CommentProvider>
      <ToastContainer position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        closeButton={false}
        />
    <NotificationsProvider>
    <SippetsProvider>
      {children}
    </SippetsProvider>
    </NotificationsProvider>
    </CommentProvider>
    // </WebsocketProvider>
  )
}
