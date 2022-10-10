import { AppContextType } from './interfaces/AppContextType';
import React, { createContext, useReducer, ReactNode } from 'react';
import ErrorsReducer, {
  ErrorAction,
  errorInitialState
} from 'src/reduces/ErrrorsReducer';
import { Nullable } from 'src/interfaces/common';
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const errorsReducer: [
    state: Nullable<string | null>,
    dispatch: React.Dispatch<ErrorAction>
  ] = useReducer(ErrorsReducer, errorInitialState);

  return (
    <AppContext.Provider value={{ errorsReducer }}>
      {children}
    </AppContext.Provider>
  );
};
