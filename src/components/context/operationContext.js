import { createContext, useState } from 'react';

export const OperationContext = createContext();

export function OperationProvider({ children }) {
  const [operation, setOperation] = useState({comercial:{title: "Comercial",completed:0,completedPurchase:0,completedInvoice:0},docs:{title: "Docs",completed:0},logistica:{title: "Logistica",completed:0},contableFinanciera:{title: "Contable financiera",completed:0}});

  return <OperationContext.Provider value={{ operation, setOperation }}>{children}</OperationContext.Provider>;
}