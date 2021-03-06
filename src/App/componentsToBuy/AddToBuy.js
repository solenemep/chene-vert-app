import React from "react"
import AddPopular from "./AddPopular"
import { useIsMounted } from "../hook/useIsMounted.js"

const AddToBuy = (props) => {
  const { darkMode, toBuyList, dispatch, setFilter } = props
  const isMounted = useIsMounted()

  const populars = [
    { text: "pommes", emoji: "π" },
    { text: "crevettes", emoji: "π¦" },
    { text: "oinions", emoji: "π§" },
    { text: "salade", emoji: "π₯¬" },
    { text: "cafΓ©", emoji: "βοΈ" },
    { text: "thΓ©", emoji: "π΅" },
    { text: "chocolat", emoji: "π«" },
    { text: "avocat", emoji: "π₯" },
    { text: "vin", emoji: "π·" },
    { text: "pq", emoji: "π§»" },
    { text: "tomates", emoji: "π" },
    { text: "croquettes", emoji: "πΆ" },
    { text: "wisky", emoji: "π₯" },
  ]

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const newToBuyText = event.target.elements.toBuy.value
    if (toBuyList.some(el => el.text.trim().toLowerCase() === newToBuyText.trim().toLowerCase())) {
      alert(`${newToBuyText} is already on the list`)
    } else {
      fetch(`https://chene-vert-api.herokuapp.com/toBuyList`, {
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
          <span role="img" aria-hidden>β</span>
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