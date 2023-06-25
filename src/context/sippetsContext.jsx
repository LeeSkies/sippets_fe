import axios from "axios"
import React, { createContext, useState } from "react"
import Joi from "joi"
import { toast } from "react-toastify"
import { useSignFile } from "../hooks/useSignFile"

export const SippetsContext = createContext({
    latestSippets: [],
    followingSippets: [],
    userComments: [],
    userSippets: [],
    latestSippetsPage: 0,
    followingSippetsPage: 0,
    userCommentsPage: 0,
    userSippetsPage: 0,
    fetchLatestSippets: () => {},
    fetchFollowingSippets: () => {},
    fetchUserComments: () => {},
    fetchUserSippets: () => {},
})

export const SippetsProvider = ({ children }) => {
    const [latestSippets, setLatestSippets] = useState([])
    const [followingSippets, setFollowingSippets] = useState([])
    const [userComments, setUserComments] = useState([])
    const [userSippets, setUserSippets] = useState([])

    const fetchLatestSippets = async (setLoading, setSippets) => {
        const { data } = await axios.get(import.meta.env.VITE_URL + `/protected/sippet/latest?offset=${latestSippets.length / 10}`, {
            withCredentials: true,
          })
        setLatestSippets([...latestSippets, ...data])
        setSippets([...latestSippets, ...data])
        setLoading(false)
        return
    }

    const fetchFollowingSippets = async (setLoading, setSippets) => {
        const { data } = await axios.get(import.meta.env.VITE_URL + `/protected/sippet/following?offset=${followingSippets.length / 10}`, {
            withCredentials: true,
          })
        setFollowingSippets([...followingSippets, ...data])
        setSippets([...followingSippets, ...data])
        setLoading(false)
        return
    }
    
    const sendSippet = async (blocks, lang, hashtags = [], setError, file, id = null) => {
    
        const sendSchema = Joi.object({
          language: Joi.string(),
          hashtags: Joi.array().items(Joi.string()).unique()
        });
    
        const { error } = sendSchema.validate({ language: lang, hashtags })
        
        if (error) {
          toast.error(error.message)
          return
        }
    
        if (blocks[blocks.length - 1].value == '') {
          blocks = blocks.slice(0, -1)
        }
    
        let len = 0
        for (const block of blocks) {
          len += block.value.length
        }
    
        if (len < 2) {
          toast.error('sippet too short')
          return
        }
        const fd = new FormData()
        if (file) {
          fd.append('file', file)
        }

        let image = await useSignFile(fd)

        const endpoint = id ? import.meta.env.VITE_URL + `/protected/sippet/comment/${id}` : import.meta.env.VITE_URL + '/protected/sippet'
    
        try {
          await axios.post(endpoint, {
            blocks,
            language: lang,
            file: image,
            hashtags: []
        },{ withCredentials: true });
        toast(`${id ? 'Comment' : 'Sippet'} posted successfully`)
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }
    
    return (
        <SippetsContext.Provider value={{
            latestSippets,
            setLatestSippets,
            followingSippets,
            setFollowingSippets,
            userComments,
            setUserComments,
            userSippets,
            setUserSippets,
            fetchLatestSippets,
            fetchFollowingSippets,
            sendSippet,
            }}>
            {children}
        </SippetsContext.Provider>
    )
}