import React from "react";
import AppReducer from "./AppReducer";

const AppContext = React.createContext();

const defaultState = {
  clientAccount: {},
};

function getGlobalState() {
  if (typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
    const client_info = sessionStorage.getItem("client_info");
    return JSON.parse(client_info) ?? defaultState;
  }
}

export function ContextProvider(props) {
  // const [creditApplication, setCreditApplication] =
  //   React.useState(getApplicationState);
  const [globalState, setGlobalState] = React.useState(getGlobalState);
  const [state, dispatch] = React.useReducer(AppReducer, globalState);

  function refreshPage(refText) {
    dispatch({
      type: "REFRESH",
      payload: refText,
    });
  }

  const loadUser = (user) => {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };

  function initializeGlobalState() {
    dispatch({
      type: "GLOBAL_REINITIALIZE",
    });
  }

  React.useEffect(() => {
    sessionStorage.setItem("client_info", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        // Global state context values
        initializeGlobalState,
        loadUser,
        refreshPage,
        }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
