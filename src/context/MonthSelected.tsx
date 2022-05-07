import React, { createContext, useContext, useState } from 'react';

//@ts-ignore
const MonthSelectedContext = createContext();

export default function MonthSelectProvider({ children }: { children: React.ReactElement }) {

  const [date, setDate] = useState(new Date());

  return (
    <MonthSelectedContext.Provider value={{
      date,
      setDate
    }} >
      {children}
    </MonthSelectedContext.Provider>
  )
}

export function useMonthSelected() {
  const context = useContext(MonthSelectedContext);
  //@ts-ignore
  const { date, setDate } = context;
  return { date, setDate };
}