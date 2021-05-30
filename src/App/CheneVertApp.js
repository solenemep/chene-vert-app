import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Link, Route, Switch
} from "react-router-dom";
import DarkMode from './DarkMode'
import Navigation from './Navigation'
import ToDo from './ToDo'
import ToBuy from './ToBuy'
import Notes from './Notes'

import RIOentier from "./images/RIOentier.png"
import RIO from "./images/RIO.png"

const CheneVertApp = () => {

  // DarkMode
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('solenemhepCheneVertDarkMode')) || false)
  const changeDarkMode = () => {
    setDarkMode(!darkMode)
  }
  useEffect(() => {
    localStorage.setItem("solenemhepCheneVertDarkMode", JSON.stringify(darkMode))
  }
  )

  // Mode
  const [mode, setMode] = useState('')

  // Background
  const backgroundImage = darkMode ? 'linear-gradient(to top, #000080, #1E90FF)' : 'linear-gradient(to top, #51ffce, #89ff89)'
  const style = {
    backgroundImage,
  }

  return (
    <Router>
      <div className={darkMode ? 'bg-dark text-white' : 'bg-white text-dark'} style={style}>

        <div className='container min-vh-100 py-3 d-flex flex-column justify-content-between'>
          <div>
            <header className='d-flex flex-row justify-content-between align-items-center mb-3'>
              <DarkMode darkMode={darkMode} changeDarkMode={changeDarkMode} />
              <Link onClick={() => setMode('')} to="/" className={darkMode ? "text-decoration-none text-white" : "text-decoration-none text-dark"}>
                <h1 className='m-0'>Chêne Vert
                <img src={RIO} alt="chenevert" width="50" height="50" />
                </h1>
              </Link>
            </header>

            <Navigation darkMode={darkMode} mode={mode} setMode={setMode} />

            <main className="mb-3">
              <Switch>
                <Route exact path="/">
                  <div className="text-center my-3">
                    <img src={RIOentier} height="300" width="auto" alt="RIOentier" />
                  </div>
                </Route>
                <Route path="/TODO">
                  <ToDo darkMode={darkMode}>
                    <h2 className="mb-3">Ma liste de tâches{' '}<span role="img" aria-hidden>🛠</span></h2>
                  </ToDo>
                </Route>
                <Route path="/TOBUY">
                  <ToBuy darkMode={darkMode}>
                    <h2 className="mb-3">Ma liste de courses{' '}<span role="img" aria-hidden>🍋</span></h2>
                  </ToBuy>
                </Route>
                <Route path="/NOTES">
                  <Notes darkMode={darkMode}>
                    <h2 className="mb-3">Mes notes{' '}<span role="img" aria-hidden>🦴</span></h2>
                  </Notes>
                </Route>
              </Switch>
            </main>
          </div>
          <footer className="text-center">&copy; Solène PETTIER</footer>

        </div>
      </div >
    </Router>
  );
}
export default CheneVertApp