import { useIsMounted } from "../hook/useIsMounted.js"

const DeleteToDo = (props) => {
  const { dispatch, el } = props
  const isMounted = useIsMounted()

  const deleteToDo = () => {
    fetch(`https://chene-vert-api.herokuapp.com/toDoList/${el.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`something went wrong ${response.statusText}`)
        }
        return response.json()
      })
      .then(data => {
        if (isMounted.current) {
          dispatch({ type: "DELETE", payload: el })
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
      className="btn btn-danger btn-sm"
      type="button"
      onClick={deleteToDo}>
      <span role="img" aria-hidden>✖️</span>
    </button>
  )
}
export default DeleteToDo