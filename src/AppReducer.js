const AppReducer = (state, action) => {
  switch (action.type) {
    case "GLOBAL_REINITIALIZE":
      return {
        clientAccount: {}
      };

    case "REFRESH":
      return {
        ...state,
        refresh: action.payload,
      };

      case "SET_USER":
      return {
        ...state,
        clientAccount: action.payload,
      };
    

    default:
      return state;
  }
};

export default AppReducer;
