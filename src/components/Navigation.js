import {
  Link
} from "react-router-dom";

const Navigation = (props) => {
  const { darkMode } = props

  return (
    <nav className='mb-3 btn-group btn-group-lg col-12'>
      <Link to="/TODO" style={{ textDecoration: 'none' }} className={darkMode ? "btn border-myblack btn-myblack text-white" : "btn border btn-light text-dark"} type='button' id='button-todo' value='ToDo'>
        à faire
          </Link>
      <Link to="/TOBUY" style={{ textDecoration: 'none' }} className={darkMode ? "btn border-myblack btn-myblack text-white" : "btn border btn-light text-dark"} type='button' id='button-todo' value='ToDo'>
        à acheter
            </Link>
      <Link to="/NOTES" style={{ textDecoration: 'none' }} className={darkMode ? "btn border-myblack btn-myblack text-white" : "btn border btn-light text-dark"} type='button' id='button-todo' value='ToDo'>
        notes
            </Link>
    </nav>
  )
}
export default Navigation