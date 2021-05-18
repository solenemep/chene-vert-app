import React, { useState, useEffect } from "react"
import SelectToBuy from './componentsToBuy/SelectToBuy'
import ToBuyList from './componentsToBuy/ToBuyList'
import AddToBuy from './componentsToBuy/AddToBuy'
import { v4 as uuidv4 } from "uuid"

const ToBuy = (props) => {
  const { darkMode, children } = props

  // ToBuys
  const [toBuyList, setToBuyList] = useState(JSON.parse(localStorage.getItem('solenemhepCheneVertToBuy')) || [])

  const addToBuy = (text) => {
    const newToBuy = {
      text,
      id: uuidv4()
    }
    setToBuyList([...toBuyList, newToBuy])
  }
  const deleteToBuy = (product) => {
    setToBuyList(toBuyList.filter((el) => el.id !== product.id))
  }
  useEffect(() => {
    localStorage.setItem('solenemhepCheneVertToBuy', JSON.stringify(toBuyList))
  }, [toBuyList])

  // Filter
  const [filter, setFilter] = useState('')

  const filteredToBuyList = toBuyList.filter((el) =>
    el.text.trim().toLowerCase().startsWith(filter.trim().toLowerCase())
  )

  return (
    <React.Fragment>
      {children}
      <AddToBuy
        darkMode={darkMode}
        toBuyList={toBuyList}
        addToBuy={addToBuy}
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
            deleteToBuy={deleteToBuy} />
        </ul>
      </div>
    </React.Fragment>
  )

}
export default ToBuy