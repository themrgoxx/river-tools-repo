let initState = {
  input:"0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D"
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

