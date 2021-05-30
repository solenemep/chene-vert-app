const SelectToBuy = (props) => {
  const { darkMode, filter, setFilter } = props

  return (
    <form className="input-group mb-3 input-group-lg">
      <label className={darkMode ? 'input-group-text border-myblack bg-myblack text-white' : 'input-group-text border bg-light text-dark'} htmlFor="search">
        <span role="img" aria-label="search">🔎</span>
      </label>
      <input
        id="search"
        type="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="rechercher ..."
        aria-label="search"
        className={darkMode ? 'form-control border-myblack bg-dark text-white' : 'form-control border bg-white text-dark'}
      />
    </form>
  )
}

export default SelectToBuy