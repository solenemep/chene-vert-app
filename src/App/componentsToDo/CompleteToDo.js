import { useIsMounted } from "../hook/useIsMounted.js"

const CompleteToDo = (props) => {
  const { dispatch, el } = props
  const isMounted = useIsMounted()

  const completeToDo = () => {
    fetch(`https://chene-vert-api.herokuapp.com/toDoList/${el.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...el,
        isCompleted: !el.isCompleted,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`something went wrong ${response.statusText}`)
        }
        return response.json()
      })
      .then(data => {
        if (isMounted.current) {
          dispatch({ type: "TOGGLE", payload: el })
        }
      })
      .catch(error => {
        if (isMounted.current) {
          dispatch({ type: "FETCH_FAILURE", payload: error.message })
        }
      })
  }

  return (
    <button
      className={el.isCompleted ? "btn btn-light btn-sm" : "btn btn-info btn-sm"}
      type="button"
      onClick={completeToDo}>
      {el.isCompleted ? 'rétablir' : <span role="img" aria-hidden>✔️</span>}
    </button>
  )
}
export default CompleteToDo