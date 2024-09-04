import {createContext, useContext, useMemo, useCallback} from "react";
import axios from 'axios'

export const DatabaseContext = createContext(null)

export const DatabaseContextProvider = ({children})=>{
  
  const getPlayers = useCallback(async()=>{
    await axios.get('http://localhost:4000/players')
    .then(response=>console.log(response))
  }, [])

  const contextValue = useMemo(()=>{
    return{
      getPlayers
    }
  }, [getPlayers])

  return(
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  )
}

export const useDatabaseContext = ()=>{
  const context = useContext(DatabaseContext)
  if(!context) {
    throw new Error (
      "useDatabaseContext must be used within a DatabaseContextProvider"
    )
  }
  return context
}