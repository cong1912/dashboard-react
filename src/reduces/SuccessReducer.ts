export const successInitialState: string | null = null;

export enum SUCCESS_ACTION {
  SET_SUCCESS = 'SET_SUCCESS',
  REMOVE_SUCCESS = 'REMOVE_SUCCESS'
}

interface SetSuccessAction {
  type: SUCCESS_ACTION.SET_SUCCESS;
  success: string;
}
interface RemoveSuccessAction {
  type: SUCCESS_ACTION.REMOVE_SUCCESS;
}

export type SuccessAction = SetSuccessAction | RemoveSuccessAction;

const SuccessReducer = (state: string | null, action: SuccessAction) => {
  switch (action.type) {
    case SUCCESS_ACTION.SET_SUCCESS:
      return action.success;
    case SUCCESS_ACTION.REMOVE_SUCCESS:
      return null;
    default:
      return state;
  }
};

export default SuccessReducer;
