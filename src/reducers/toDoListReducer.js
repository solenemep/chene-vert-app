export const toDoListReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        toDoList: [...state.toDoList, action.payload]
      }
    case "DELETE":
      return {
        ...state,
        toDoList: state.toDoList.filter(el => el.id !== action.payload.id),
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
        toDoList: action.payload,
      }
    default:
      throw new Error(`Unsupported action type ${action.type} in toBuyListReducer`)
  }
}