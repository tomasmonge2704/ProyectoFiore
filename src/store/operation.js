import { create } from "zustand";

export const useStore = create((set) => ({
  operation: undefined,
  setOperation: (newOperation) =>
    set(() => ({
      operation: newOperation,
    })),
  setFieldsDocs: (fields) => {
    set((state) => ({
      operation: {
        ...state.operation,
        docs: {
          ...state.operation.docs,
          fields: fields
        },
      },
    }))},
  setFieldsComercial: (fields) => {
    set((state) => ({
      operation: {
        ...state.operation,
        comercial: {
          ...state.operation.comercial,
          fields: fields
        },
      },
    }));
  },
  setFieldsLogistica: (fields) => {
    set((state) => ({
      operation: {
        ...state.operation,
        logistica: {
          ...state.operation.logistica,
          fields: fields
        },
      },
    }));
  },
  setFieldsContableFinanciera: (fields) => {
    set((state) => ({
      operation: {
        ...state.operation,
        contableFinanciera: {
          ...state.operation.contableFinanciera,
          fields: fields
        },
      },
    }));
  }
}));
