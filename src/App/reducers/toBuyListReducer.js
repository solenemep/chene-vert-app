export const toBuyListReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        toBuyList: [...state.toBuyList, action.payload],
        loading: false,
        error: "",
      }
    case "DELETE":
      return {
        ...state,
        toBuyList: state.toBuyList.filter(el => el.id !== action.payload.id),
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
        toBuyList: action.payload,
        loading: false,
        error: "",
      }
    default:
      throw new Error(`Unsupported action type ${action.type} in toBuyListReducer`)
  }
}
export default toBuyListReducer