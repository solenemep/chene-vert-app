import React, { useState, useEffect } from 'react'

const Notes = (props) => {
  const { darkMode, children } = props

  // Notes
  const [note, setNote] = useState(JSON.parse(localStorage.getItem('solenemhepCheneVertNote')) || '')

  useEffect(() => {
    localStorage.setItem('solenemhepCheneVertNote', JSON.stringify(note))
  }, [note])

  return (
    <React.Fragment>
      {children}
      <form>
        <textarea
          value={note}
          rows='16'
          onChange={(e) => setNote(e.target.value)}
          className={darkMode ? 'form-control form-control-lg border-myblack bg-dark text-white' : 'form-control form-control-lg border bg-white text-dark'}
        />
      </form>
    </React.Fragment>
  )

}
export default Notes