import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  
  const value = { user,setUser}

    return(
      <AppContextProvider value = {value}>
      {props.children}
      </AppContextProvider>
      )
  }
export default AppContextProvider;
    
