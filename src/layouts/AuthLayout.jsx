import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthBar } from '../components/auth/AuthBar';
import { AuthFooter } from '../components/auth/AuthFooter';
import { Menu } from '../components/public/Menu';

export const AuthLayout = () => {

  return (
    <div className='container mx-auto flex justify-center items-start min-h-screen'>
        <section className='hidden sm:flex justify-end sticky top-0 lg:w-[300px] max-w-[300px]'>
          <Menu />
        </section>
        <section className='flex md:min-w-[500px] max-w-[650px] pb-20 items-start justify-center sm:border-l sm:border-x border-slate-600 min-h-screen  container max-md:grow'>
          <Outlet />
        </section>
        <section className='justify-start hidden md:flex sticky top-0 w-[300px] max-w-[300px]'>
          <AuthBar />
        </section>
        <AuthFooter />
    </div>
  );
};