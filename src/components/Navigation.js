import {
  Link
} from "react-router-dom";

const Navigation = (props) => {
  const { darkMode } = props

  return (
    <nav className='mb-3 btn-group btn-group-lg col-12'>
      <button className={darkMode ? "btn border-myblack btn-myblack" : "btn border btn-light"} type='button' id='button-todo' value='ToDo'>
        <Link to="/TODO" style={{ textDecoration: 'none' }} className={darkMode ? "text-white" : "text-dark"}>
          à faire
          </Link>
      </button>
      <button className={darkMode ? "btn border-myblack btn-myblack" : "btn border btn-light"} type='button' id='button-tobuy' value='ToBuy'>
        <Link to="/TOBUY" style={{ textDecoration: 'none' }} className={darkMode ? "text-white" : "text-dark"}>
          à acheter
            </Link>
      </button>
      <button className={darkMode ? "btn border-myblack btn-myblack" : "btn border btn-light"} type='button' id='button-notes' value='Notes'>
        <Link to="/NOTES" style={{ textDecoration: 'none' }} className={darkMode ? "text-white" : "text-dark"}>
          notes
            </Link>
      </button>
    </nav>
  )
}
export default Navigation