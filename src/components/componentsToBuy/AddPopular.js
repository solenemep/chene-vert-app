import { useIsMounted } from "/Users/solenepettier/Desktop/chene-vert-app/src/hook/useIsMounted.js"

const AddPopular = (props) => {
  const { darkMode, toBuyList, dispatch, setFilter, popular } = props
  const isMounted = useIsMounted()

  const addToBuy = () => {
    const newToBuyText = popular.text
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
    setFilter('')
  }

  return (
    <button
      id="toBuy"
      value={popular.text}
      className={darkMode ? 'btn border-myblack btn-myblack text-white m-1' : 'btn border btn-light text-dark m-1'}
      onClick={addToBuy}
      disabled={toBuyList.some(el => el.text === popular.text)}
    >
      {popular.text}{" "}
      <span role="img" aria-hidden>
        {popular.emoji}
      </span>
    </button>
  )
}
export default AddPopular