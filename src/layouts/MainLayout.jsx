import React from 'react'
import { Outlet } from 'react-router-dom'
import { UserBar } from '../components/protected/UserBar'
import { Menu } from '../components/protected/Menu'
import { FloatingMenu } from '../components/protected/FloatingMenu'
import { ConfirmModal } from '../components/common/ConfirmModal'
import { Discover } from '../components/protected/Discover/Discover'

export const MainLayout = () => {

  return (
    <div className='container mx-auto flex justify-center items-start min-h-screen overflow-y-auto'>
      {/* <FloatingMenu /> */}
        <section className='hidden sm:flex justify-end sm:min-w-[60px] relative top-0 lg:w-[300px] max-w-[300px] z-10'>
          <Menu />
        </section>
        <section className='flex md:min-w-[500px] max-w-[650px] -20 overflow-x-hidden justify-center items-start sm:border-l min-h-screen overflow-y-auto sm:border-x border-slate-600 container max-md:grow'>
          <Outlet />
        </section>
        <section className='justify-start hidden md:flex flex-col sticky top-0 w-[300px] max-w-[300px] z-10 p-2'>
          <UserBar />
          <Discover />
        </section>
    </div>
  )
}
