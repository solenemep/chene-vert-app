export const noteReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        note: action.payload
      }
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
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
        loading: false,
        error: "",
        note: action.payload,
      }
    default:
      throw new Error(`Unsupported action type ${action.type} in noteReducer`)
  }
}