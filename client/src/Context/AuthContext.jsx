import React, { useEffect, useState } from "react";

let AuthContext = React.createContext({
  isLogged: false,
  updateStatus: () => { }
});

export function AuthContextProvider(props) {
  const [isLogged, setIsLogged] = useState(false);

  function checkLocalStorage() {
    if (!localStorage.getItem('token')) {
      setIsLogged(false);
    }
    if (localStorage.getItem('token')) {
      setIsLogged(true);
    }
  }

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const updateStatus = (status) => {
    setIsLogged(status);
  }

  return <AuthContext.Provider
    value={{
      isLogged: isLogged,
      updateStatus: updateStatus
    }}
  >
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext;

