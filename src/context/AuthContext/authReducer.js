export const appReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        logged: true
      };
  }
};