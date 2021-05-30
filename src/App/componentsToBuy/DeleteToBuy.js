import { useIsMounted } from "../hook/useIsMounted.js"

const DeleteToBuy = (props) => {
  const { dispatch, el } = props
  const isMounted = useIsMounted()

  const deleteToBuy = () => {
    fetch(`http://localhost:4000/toBuyList/${el.id}`, {
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
      className="btn btn-sm btn-warning"
      onClick={deleteToBuy}>
      <span role="img" aria-hidden>✖️</span>{" "}ok
    </button>
  )
}
export default DeleteToBuy