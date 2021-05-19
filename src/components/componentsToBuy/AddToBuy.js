import React from "react"
import AddPopular from "./AddPopular"
import { useIsMounted } from "/Users/solenepettier/Desktop/chene-vert-app/src/hook/useIsMounted.js"

const AddToBuy = (props) => {
  const { darkMode, toBuyList, dispatch, setFilter } = props
  const isMounted = useIsMounted()

  const populars = [
    { text: "pommes", emoji: "🍏" },
    { text: "crevettes", emoji: "🦐" },
    { text: "oinions", emoji: "🧅" },
    { text: "salade", emoji: "🥬" },
    { text: "café", emoji: "☕️" },
    { text: "thé", emoji: "🍵" },
    { text: "chocolat", emoji: "🍫" },
    { text: "avocat", emoji: "🥑" },
    { text: "vin", emoji: "🍷" },
    { text: "pq", emoji: "🧻" },
    { text: "tomates", emoji: "🍅" },
    { text: "croquettes", emoji: "🐶" },
    { text: "wisky", emoji: "🥃" },
  ]

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const newToBuyText = event.target.elements.toBuy.value
    if (toBuyList.some(el => el.text.trim().toLowerCase() === newToBuyText.trim().toLowerCase())) {
      alert(`${newToBuyText} is already on the list`)
    } else {
      fetch(`http://localhost:4000/toBuyList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newToBuyText,
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
      <form className="input-group input-group-lg" onSubmit={handleFormSubmit}>

        <label className={darkMode ? 'input-group-text border-myblack bg-myblack text-white' : 'input-group-text border bg-light text-dark'} htmlFor="toBuy">
          <span role="img" aria-hidden>➕</span>
        </label>
        <input className={darkMode ? 'form-control border-myblack bg-dark text-white' : 'form-control border bg-white text-dark'} id="toBuy" aria-label="toBuy" name="toBuy" required />

        <button type="submit" className={darkMode ? 'btn border-myblack btn-myblack text-white' : 'btn border btn-light text-dark'}>
          ajouter
      </button>

      </form>

      <div className="m-3 d-flex flex-wrap">
        <label htmlFor="toBuy">
          {populars.map((popular) => (
            <AddPopular key={popular.text} darkMode={darkMode} toBuyList={toBuyList} dispatch={dispatch} setFilter={setFilter} popular={popular} />
          ))}
        </label>
      </div>
    </React.Fragment>
  )
}
export default AddToBuy