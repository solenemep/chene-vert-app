import React from "react"
import { useIsMounted } from "../hook/useIsMounted"

const AddToDo = (props) => {
  const { darkMode, toDoList, dispatch, setFilter } = props
  const isMounted = useIsMounted()

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const newToDoText = event.target.elements.toDo.value
    if (toDoList.some(el => el.text.trim().toLowerCase() === newToDoText.trim().toLowerCase())) {
      alert(`${newToDoText} is already on the list`)
    } else {
      fetch(`https://chene-vert-api.herokuapp.com/toDoList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newToDoText,
          isCompleted: false,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Something went wrong: ${response.textStatus}`)
          }
          return response.json()
        })
        .then(data => {
          if (isMounted.current) {
            dispatch({ type: "ADD", payload: data })
          }
        })
        .catch(error => {
          if (isMounted.current) {
            dispatch({ type: "FETCH_FAILURE", payload: error.message })
          }
        })
      event.target.reset()
      setFilter('')
    }
  }

  return (
    <React.Fragment>
      <form className="input-group mb-3 input-group-lg" onSubmit={handleFormSubmit}>

        <label className={darkMode ? 'input-group-text border-myblack bg-myblack text-white' : 'input-group-text border bg-light text-dark'} htmlFor="toDo">
          <span role="img" aria-hidden>➕</span>
        </label>
        <input className={darkMode ? 'form-control border-myblack bg-dark text-white' : 'form-control border bg-white text-dark'} id="toDo" aria-label="toDo" name="toDo" required />

        <button type="submit" className={darkMode ? 'btn border-myblack btn-myblack text-white' : 'btn border btn-light text-dark'}>
          ajouter
      </button>

      </form>
    </React.Fragment>
  )
}
export default AddToDo