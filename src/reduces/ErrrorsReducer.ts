export const errorInitialState: string | null = null;

export enum ERROR_ACTION {
  SET_ERROR = 'SET_ERROR',
  REMOVE_ERROR = 'REMOVE_ERROR'
}

interface SetErrorAction {
  type: ERROR_ACTION.SET_ERROR;
  error: string;
}
interface RemoveErrorAction {
  type: ERROR_ACTION.REMOVE_ERROR;
}

export type ErrorAction = SetErrorAction | RemoveErrorAction;

const ErrorsReducer = (state: string | null, action: ErrorAction) => {
  switch (action.type) {
    case ERROR_ACTION.SET_ERROR:
      return action.error;
    case ERROR_ACTION.REMOVE_ERROR:
      return null;
    default:
      return state;
  }
};

export default ErrorsReducer;
