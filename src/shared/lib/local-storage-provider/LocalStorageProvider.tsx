import { createContext, useContext, useReducer } from 'react';

import type { PropsWithChildren } from 'react';

type LocalStorageContextValue = {
  triggerUpdate: () => void;
  updateKey: number;
};

const LocalStorageContext = createContext<LocalStorageContextValue | undefined>(
  undefined,
);

export const LocalStorageProvider = ({ children }: PropsWithChildren) => {
  const [updateKey, triggerUpdate] = useReducer((x) => x + 1, 0);

  return (
    <LocalStorageContext.Provider value={{ triggerUpdate, updateKey }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageUpdate = () => {
  const context = useContext(LocalStorageContext);

  if (!context) {
    throw new Error(
      'useLocalStorageUpdate must be used within LocalStorageProvider',
    );
  }

  return context;
};
