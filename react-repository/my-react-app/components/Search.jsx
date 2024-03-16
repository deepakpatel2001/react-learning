const Search = ({setQuery}) => {
  let clickHandler = (e) => {
      setQuery(e.target.value.toLowerCase());
  };
  return (
      <div className="searchCountry">
          <span className="searchIcon">🔍</span>
          <input onChange={clickHandler} type="text" placeholder="Search Country Name." />
      </div>
  );
}

export default Search
