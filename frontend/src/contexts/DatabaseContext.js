import {createContext, useContext, useMemo, useCallback} from "react";
import axios from 'axios'

export const DatabaseContext = createContext(null)

export const DatabaseContextProvider = ({children})=>{
  
  const getPlayers = useCallback(async()=>{
    await axios.get('http://localhost:4000/players')
    .then(response=>console.log(response))
  }, [])

  const saveCard = useCallback(async(cardData)=>{
    const response = await axios.post('http://localhost:4000/saveCard', cardData)
    return response.data
  }, [])

  const contextValue = useMemo(()=>{
    return{
      getPlayers, saveCard
    }
  }, [getPlayers, saveCard])

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

