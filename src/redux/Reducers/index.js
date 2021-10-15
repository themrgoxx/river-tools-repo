let initState = {
  input:"0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B"
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

