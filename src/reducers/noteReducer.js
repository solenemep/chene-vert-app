export const noteReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        note: action.payload,
        loading: false,
        error: "",
      }
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: "",
      }
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case "FETCH_SUCCESS":
      return {
        ...state,
        note: action.payload,
        loading: false,
        error: "",
      }
    default:
      throw new Error(`Unsupported action type ${action.type} in noteReducer`)
  }
}
export default noteReducer