import CompleteToDo from "./CompleteToDo"
import DeleteToDo from "./DeleteToDo"

const ToDoList = (props) => {
  const { darkMode, toDoList, dispatch } = props

  return toDoList.map((el) => {
    return (
      <li className={darkMode ? "list-group-item bg-dark text-white p-2 d-flex align-items-center justify-content-between" : "list-group-item bg-white text-dark p-2 d-flex align-items-center justify-content-between"} key={el.id}>
        <span className="ms-1" style={el.isCompleted ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>{el.text}</span>
        <div className="btn-group">
          <CompleteToDo dispatch={dispatch} el={el} />
          <DeleteToDo dispatch={dispatch} el={el} />
        </div>
      </li>
    )
  })
}
export default ToDoList