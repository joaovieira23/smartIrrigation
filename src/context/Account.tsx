import React, { createContext, useContext, useState } from 'react';

//@ts-ignore
const AccountContext = createContext();

export default function AccountCreateProvider({ children }: { children: React.ReactElement }) {

  const [createAccount, setCreateAccount] = useState(false);

  return (
    <AccountContext.Provider value={{
      createAccount,
      setCreateAccount
    }} >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountCreate() {
  const context = useContext(AccountContext);
  //@ts-ignore
  const { createAccount, setCreateAccount } = context;
  return { createAccount, setCreateAccount };
}