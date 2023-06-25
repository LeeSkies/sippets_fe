import { createContext, useState } from "react";

export const CommentContext = createContext({
    commentingOn: null
})

export const CommentProvider = ({ children }) => {
    const [commentingOn, setCommentingOn] = useState(null)
    return (
        <CommentContext.Provider value={{ commentingOn, setCommentingOn }}>
            {children}
        </CommentContext.Provider>
    )
}