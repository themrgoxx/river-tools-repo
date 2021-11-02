let initState = {
  input:"0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
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

