import React, { useContext, createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({
    _id: "",
    name: "",
    username: "",
    eienyo: "",
    picture: "",
  });


  const updateEienyo = (newEienyo) => {
    setAccount((prevAccount) => ({ ...prevAccount, eienyo: newEienyo }));
  };

  const updateName = (newName) => {
    setAccount((prevAccount) => ({...prevAccount,name: newName}))
  }

  const updatePicture = (newPicture) =>{
    setAccount((prevAccount)=>({...prevAccount, picture: newPicture}))
  }

  return (
    <DataContext.Provider value={{ account, setAccount, updateEienyo, updateName, updatePicture }}>
      {children}
    </DataContext.Provider>
  );
};

const useData=()=>{
    const context = useContext(DataContext);
    if(!context){
        throw new Error("UseData must be used within a Dataprovider");

    }
    return context;
}



export { DataProvider, useData };
