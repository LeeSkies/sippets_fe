import React from 'react'
import { Signup } from './Signup'
import { Login } from './Login'
import { Modal } from '../common/Modal'

export const AuthBar = () => {
  return (
    <aside className='flex flex-col  max-lg:max-w-[250px] justify-center max-lg:items-center p-2 py-4 lg:px-8 w-full max-w-[350px] space-y-4 min-w-[200px]'>
        <section className='rounded-lg border border-gray-700 bg-gray-800 grid w-full gap-4 p-4'>
            <Modal label='Sign Up'>
                <Signup />
            </Modal>
            <Modal label='Log In'>
                <Login />
            </Modal>
        </section>
    </aside>
  )
}
