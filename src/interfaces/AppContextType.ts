import React from 'react';
import { ErrorAction } from 'src/reduces/ErrrorsReducer';
import { Nullable } from './common';
export interface AppContextType {
  errorsReducer: [
    error: Nullable<string>,
    dispatch: React.Dispatch<ErrorAction>
  ];
}
