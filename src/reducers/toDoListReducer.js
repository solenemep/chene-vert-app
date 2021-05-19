export const toDoListReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        toDoList: [...state.toDoList, action.payload],
        loading: false,
        error: "",
      }
    case "DELETE":
      return {
        ...state,
        toDoList: state.toDoList.filter(el => el.id !== action.payload.id),
        loading: false,
        error: "",
      }
    case "TOGGLE":
      return {
        ...state,
        toDoList: state.toDoList.map(el => {
          if (el.id === action.payload.id) {
            return {
              ...el,
              isCompleted: !el.isCompleted,
            }
          }
          return el
        }),
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
        toDoList: action.payload,
        loading: false,
        error: "",
      }
    default:
      throw new Error(`Unsupported action type ${action.type} in toDoListReducer`)
  }
}
export default toDoListReducer