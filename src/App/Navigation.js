import {
  Link
} from "react-router-dom";

const Navigation = (props) => {
  const { darkMode, mode, setMode } = props

  return (
    <nav className='mb-3 btn-group btn-group-lg col-12'>
      <button disabled={mode === 'TODO'} className={darkMode ? "btn border-myblack btn-myblack" : "btn border btn-light"} type='button' id='button-todo' value='ToDo'>
        <Link onClick={() => setMode('TODO')} to="/TODO" style={{ textDecoration: 'none' }} className={darkMode ? "text-white" : "text-dark"}>
          à faire
          </Link>
      </button>
      <button disabled={mode === 'TOBUY'} className={darkMode ? "btn border-myblack btn-myblack" : "btn border btn-light"} type='button' id='button-tobuy' value='ToBuy'>
        <Link onClick={() => setMode('TOBUY')} to="/TOBUY" style={{ textDecoration: 'none' }} className={darkMode ? "text-white" : "text-dark"}>
          à acheter
            </Link>
      </button>
      <button disabled={mode === 'NOTE'} className={darkMode ? "btn border-myblack btn-myblack" : "btn border btn-light"} type='button' id='button-notes' value='Notes'>
        <Link onClick={() => setMode('NOTE')} to="/NOTES" style={{ textDecoration: 'none' }} className={darkMode ? "text-white" : "text-dark"}>
          notes
            </Link>
      </button>
    </nav>
  )
}
export default Navigation