import React, { useState, useEffect, useReducer } from "react"
import SelectToDo from './componentsToDo/SelectToDo'
import ToDoList from './componentsToDo/ToDoList'
import AddToDo from './componentsToDo/AddToDo'

import toDoListReducer from '../reducers/toDoListReducer'
import { useIsMounted } from "../hook/useIsMounted"

const init = {
  toDoList: [],
  loading: false,
  error: ""
}

const ToDo = (props) => {
  const { darkMode, children } = props

  // ToDos
  const [state, dispatch] = useReducer(toDoListReducer, init)
  const { toDoList, loading, error } = state
  const isMounted = useIsMounted()

  useEffect(() => {
    dispatch({ type: "FETCH_INIT" })
    fetch("http://localhost:4000/toDoList")
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

  // Filter
  const [filter, setFilter] = useState(JSON.parse(localStorage.getItem('solenemhepCheneVertFilter')) || "all")
  useEffect(() => {
    localStorage.setItem("solenemhepCheneVertFilter", JSON.stringify(filter))
  }
  )

  const filteredToDoList = state.toDoList.filter((el) => {
    if (filter === "completed") {
      return el.isCompleted
    }
    if (filter === "inprogress") {
      return !el.isCompleted
    }
    return true
  })

  return (
    <React.Fragment>
      {children}
      {error && <p className="alert-danger">{error}</p>}
      {loading && <p>Loading...</p>}
      <AddToDo
        darkMode={darkMode}
        toDoList={toDoList}
        dispatch={dispatch}
        setFilter={setFilter} />

      <SelectToDo
        darkMode={darkMode}
        filter={filter}
        setFilter={setFilter} />

      <div className={darkMode ? 'card shadow border-myblack' : 'card shadow border'}>
        <ul className="list-group">
          <ToDoList
            darkMode={darkMode}
            toDoList={filteredToDoList}
            dispatch={dispatch} />
        </ul>
      </div>
    </React.Fragment>
  )

}
export default ToDo