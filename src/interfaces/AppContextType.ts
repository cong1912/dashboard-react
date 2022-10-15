import React from 'react';
import { ErrorAction } from 'src/reduces/ErrorsReducer';
import { SuccessAction } from 'src/reduces/SuccessReducer';
import { Nullable } from './common';
export interface AppContextType {
  errorsReducer: [
    error: Nullable<string>,
    dispatch: React.Dispatch<ErrorAction>
  ];
  successReducer: [
    success: Nullable<string>,
    dispatch: React.Dispatch<SuccessAction>
  ];
}
