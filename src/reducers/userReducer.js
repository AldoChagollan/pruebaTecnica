const initialState = {
  loading: false,
  error: "",
  token: localStorage.getItem("testToken") || "",
  users: [],
  SearchText: "",
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OnLoading":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "OnError":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LoginUser":
      return {
        ...state,
        loading: false,
        token: action.payload,
        error: false,
      };
    case "GetUsers":
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case "GetSearch":
      return {
        ...state,
        loading: true,
        error: "",
        SearchText: action.payload,
      };
    case "OnSearch":
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
      case "CreateUser":
        return {
          ...state,
          loading: false,
          users: [...state.users, action.payload],
          error: "",
        };
    default:
      return state;
  }
};
