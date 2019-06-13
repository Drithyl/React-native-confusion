
import * as ActionTypes from "./ActionTypes";

export const favorites = (state = [], action) =>
{
  switch(action.type)
  {
    case ActionTypes.ADD_FAVORITE:
      //check if favorite is already in the list
      if (state.some((el) => el === action.payload) === true)
      {
        return state;
      }

      else return state.concat(action.payload);

    default:
      return state;
  }
}
