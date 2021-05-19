import DeleteToBuy from "./DeleteToBuy"

const ToBuyList = (props) => {
  const { darkMode, toBuyList, dispatch } = props

  return toBuyList.map((el) => {
    return (
      <li className={darkMode ? "list-group-item bg-dark text-white p-2 d-flex align-items-center justify-content-between" : "list-group-item bg-white text-dark p-2 d-flex align-items-center justify-content-between"} key={el.id}>
        <span className="ms-1">{el.text}</span>
        <DeleteToBuy dispatch={dispatch} el={el} />
      </li>
    )
  })
}
export default ToBuyList