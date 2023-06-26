import React, { useContext, useEffect, useState } from 'react'
import { Title } from '../../common/Title'
import { SettingsBg } from './SettingsBg'
import { SettingsBanner } from './SettingsBanner'
import { UserContext } from '../../../context/userContext'
import { CodeThemeSettings } from './CodeThemeSettings'
import { UsernameSettings } from './UsernameSettings'
import { BioSettings } from './BioSettings'
import { toast } from 'react-toastify'
import { PicSettings } from './PicSettings'
import { useSignFile } from '../../../hooks/useSignFile'
import instance from '../../../services/axios'

export const Settings = () => {

  const [open, setOpen] = useState([])
  const { user, setUser } = useContext(UserContext)
  const [edit, setEdit] = useState({})
  const [loading, setLoading] = useState(false)

  const updateDetails = async () => {
    setLoading(true)
    try {
      const obj = Object.keys(edit).reduce((acc, key) => {
        if (edit[key]) {
          acc[key] = edit[key];
        }
        return acc;
      }, {});
      if (obj?.image && obj.image != 'noimage') {
        const fd = new FormData()
        fd.append('file', obj.image)
        obj.image = await useSignFile(fd)
      }

      await instance.put('/protected/user/self', obj, { withCredentials: true });
      setUser({...edit, image: obj.image})
      toast.success('User updated successfully')
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Failed to update')
    }
  }

  const handleClick = (value) => {
    if (edit) {
      if (open.includes(value))
        setOpen(prev => prev.filter(s => s != value))
      else
        setOpen([...open, value])
    }
  }

  useEffect(() => {
    setEdit(user)
  }, [user])

  return (
    <div className='w-full relative flex flex-col'>
      <SettingsBg />
        <Title title={'Settings'} />
      <section className='py-4 space-y-8'>
        <SettingsBanner open={open} onClick={() => handleClick('Theme')} text={'Theme'} />
        <CodeThemeSettings edit={edit} open={open} setEdit={setEdit} handleClick={handleClick} />
        <UsernameSettings edit={edit} open={open} setEdit={setEdit} handleClick={handleClick} />
        <PicSettings edit={edit} open={open} setEdit={setEdit} handleClick={handleClick} user={user} />
        <BioSettings edit={edit} open={open} setEdit={setEdit} handleClick={handleClick} />
      </section>
      <button disabled={loading} onClick={updateDetails} className='w-[300px] flex justify-center items-center self-center h-14 bg-green-600 rounded-md active:scale-95 hover:bg-green-700 duration-300 mb-4'>
        {loading ? <div className='rounded-full h-5 w-5 border border-b-sky-400 animate-spin'></div> : 'save'}
      </button>
    </div>
  )
}
