import React, { useContext } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { PublicHome } from '../components/public/PublicHome'
import { UserHome } from '../components/protected/UserHome'
import { Notifications } from '../components/protected/Notifications'
import { Liked } from '../components/protected/Liked'
import { PublicSippetPage } from '../components/public/PublicSippetPage'
import { UserSippetPage } from '../components/protected/UserSippetPage'
import { UserContext } from '../context/userContext'
import { Convos } from '../components/protected/Convos'
import { Profile } from '../components/common/Profile/Profile'
import { Convo } from '../components/protected/Convo'
import { Settings } from '../components/protected/Settings/Settings'

export const AppRoutes = () => {

  const { loggedIn } = useContext(UserContext)

    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path='/' element={loggedIn ? <MainLayout /> : <AuthLayout />} >
              <Route index element={loggedIn ? <UserHome /> : <PublicHome />} />
              <Route path='/notifications' element={loggedIn ? <Notifications /> : <PublicHome />} />
              {/* <Route path='/conversations' element={loggedIn ? <Convos /> : <PublicHome />} /> */}
              {/* <Route path='/messages/:id' element={<Convo />} /> */}
              <Route path='/liked' element={loggedIn ? <Liked /> : <PublicHome />} />
              <Route path='/profile' element={loggedIn ? <Profile /> : <PublicHome />} />
              <Route path='/sippet/:id' element={loggedIn ? <UserSippetPage /> : <PublicSippetPage />} />
              <Route path='user/:id' element={<Profile />} />
              <Route path='/settings' element={loggedIn ? <Settings /> : <PublicHome />} />
          </Route>
        )
      )
  return (
    <RouterProvider router={router} />
  )
}
