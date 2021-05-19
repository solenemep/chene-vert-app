import React, { useEffect, useReducer } from 'react'

import noteReducer from '../reducers/noteReducer'
import { useIsMounted } from "../hook/useIsMounted"

const init = {
  note: "",
  loading: false,
  error: ""
}

const Notes = (props) => {
  const { darkMode, children } = props
  const [state, dispatch] = useReducer(noteReducer, init)
  const { note, loading, error } = state
  const isMounted = useIsMounted()

  useEffect(() => {
    dispatch({ type: "FETCH_INIT" })
    fetch("")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.statusText}`)
        }
        return response.json()
      })
      .then(data => {
        if (isMounted.current) {
          dispatch({ type: "FETCH_SUCCESS", payload: data })
        }
      })
      .catch(error => {
        if (isMounted.current) {
          dispatch({ type: "FETCH_FAILURE", payload: error.message })
        }
      })
  }, [isMounted])

  const updateNote = (event) => {
    event.preventDefault()
    const newNote = event.target.value
    fetch(``, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newNote,
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
          dispatch({ type: "ADD", payload: data.toBuyList })
        }
      })
      .catch(error => {
        if (isMounted.current) {
          dispatch({ type: "FETCH_FAILURE", payload: error.message })
        }
      })
  }


  return (
    <React.Fragment>
      {children}
      {error && <p className="alert-danger">{error}</p>}
      {loading && <p>Loading...</p>}
      <form>
        <label htmlFor="note" className="d-flex">
          <textarea
            id="note"
            name="note"
            value={note}
            rows='16'
            onChange={updateNote}
            className={darkMode ? 'form-control form-control-lg border-myblack bg-dark text-white' : 'form-control form-control-lg border bg-white text-dark'}
          /></label>
      </form>
    </React.Fragment>
  )

}
export default Notes