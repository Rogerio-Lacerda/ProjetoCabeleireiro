import React from 'react';

export const UserContext = React.createContext();

export const GlobalContext = ({ children }) => {
  const [user, setUser] = React.useState({ isLogin: false, nome: '', id: '0' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
