let initState = {
  input:"0x5853ccBDc428d5fC9F8C1d3599B252C88477b460"
};

let initMark = {
  mark: false
};

export const UserReducer = (state = initState, action) => {
  const { type, payload } = action; //object destructring
  switch (type) {
    case "BALANCE":
      return {
        ...state,
        balance: payload,
      };
    case "USER_REWARD":
      
      return {
        ...state,
        reward: payload,
      };


    default:
      return state;
  }
};



export const InputReducer = (state = initState,{type,payload}) => {
  switch (type) {
      case 'INPUTADDRESS':
        return{
          ...state,
          input:payload
        }

    default:
      return state;
  }
};

export const ToggleReducer = (state = initMark,{type,payload}) => {
  switch (type) {
      case 'Toggler':
        return{
          ...state,
          mark:payload
        }

    default:
      return state;
  }
};

