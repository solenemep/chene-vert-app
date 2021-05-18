export const toBuyListReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        toBuyList: [...state.toBuyList, action.payload]
      }
    case "DELETE":
      return {
        ...state,
        toBuyList: state.toBuyList.filter(el => el.id !== action.payload.id),
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
        toBuyList: action.payload,
      }
    default:
      throw new Error(`Unsupported action type ${action.type} in toBuyListReducer`)
  }
}