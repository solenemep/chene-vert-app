import React, { useState, useEffect, useReducer } from "react"
import SelectToBuy from './componentsToBuy/SelectToBuy'
import ToBuyList from './componentsToBuy/ToBuyList'
import AddToBuy from './componentsToBuy/AddToBuy'

import toBuyListReducer from '../reducers/toBuyListReducer'
import { useIsMounted } from "../hook/useIsMounted"

const init = {
  toBuyList: [],
  loading: false,
  error: ""
}

const ToBuy = (props) => {
  const { darkMode, children } = props

  // ToBuys
  const [state, dispatch] = useReducer(toBuyListReducer, init)
  const { toBuyList, loading, error } = state
  const isMounted = useIsMounted()

  useEffect(() => {
    dispatch({ type: "FETCH_INIT" })
    fetch("https://chene-vert-api.herokuapp.com/toBuyList")
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
  const [filter, setFilter] = useState('')

  const filteredToBuyList = toBuyList.filter((el) =>
    el.text.trim().toLowerCase().startsWith(filter.trim().toLowerCase())
  )

  return (
    <React.Fragment>
      {children}
      {error && <p className="alert-danger">{error}</p>}
      {loading && <p>Loading...</p>}
      <AddToBuy
        darkMode={darkMode}
        toBuyList={toBuyList}
        dispatch={dispatch}
        setFilter={setFilter} />

      <SelectToBuy
        darkMode={darkMode}
        filter={filter}
        setFilter={setFilter} />

      <div className={darkMode ? 'card shadow border-myblack' : 'card shadow border'}>
        <ul className="list-group">
          <ToBuyList
            darkMode={darkMode}
            toBuyList={filteredToBuyList}
            dispatch={dispatch} />
        </ul>
      </div>
    </React.Fragment>
  )

}
export default ToBuy