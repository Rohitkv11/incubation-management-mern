import React,{createContext,useState} from 'react'

export const tokenContext = createContext(null)
function Token({children}){


    const[token,setToken] = useState("")
    return(
        <tokenContext.Provider value={{token,setToken}}>
{children}
        </tokenContext.Provider>
    )
}
export default Token