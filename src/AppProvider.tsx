import { AppContextType } from './interfaces/AppContextType';
import React, { createContext, useReducer, ReactNode } from 'react';
import ErrorsReducer, {
  ErrorAction,
  errorInitialState
} from 'src/reduces/ErrorsReducer';
import { Nullable } from 'src/interfaces/common';
import SuccessReducer, {
  SuccessAction,
  successInitialState
} from './reduces/SuccessReducer';
export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const errorsReducer: [
    state: Nullable<string | null>,
    dispatch: React.Dispatch<ErrorAction>
  ] = useReducer(ErrorsReducer, errorInitialState);

  const successReducer: [
    state: Nullable<string | null>,
    dispatch: React.Dispatch<SuccessAction>
  ] = useReducer(SuccessReducer, successInitialState);

  return (
    <AppContext.Provider value={{ errorsReducer, successReducer }}>
      {children}
    </AppContext.Provider>
  );
};
