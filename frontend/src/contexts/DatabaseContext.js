import {createContext, useContext, useMemo, useCallback} from "react";
import pg from 'pg'

export const DatabaseContext = createContext(null)

export const DatabaseContextProvider = async({children})=>{

  const { Client } = pg
  const client = useMemo(()=>{new Client({
    connectionString: "postgresql://postgres:postgres@localhost:5440/postgres"
  })},[Client])

  await client.connect()
  
  const getPlayers = useCallback(async()=>{
    const res = await client.query('SELECT * FROM public.players')
    console.log(res.rows[0].message) // Hello world!
    await client.end()
  },[client])

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