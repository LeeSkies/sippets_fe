import React from 'react'
import { Signup } from './Signup'
import { Login } from './Login'
import { Modal } from '../common/Modal'

export const AuthFooter = () => {
  return (
    <footer className='fixed  bg-neutral-950 bottom-0 w-full flex justify-center items-center p-1 space-x-4 md:hidden'>
        <Modal label='Sign Up'>
            <Signup />
        </Modal>
        <Modal label='Log In'>
            <Login />
        </Modal>
    </footer>
  )
}
