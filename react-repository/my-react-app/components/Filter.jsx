const Filter = () => {
  return (
      <div className="filter-region">
          <select className="selectCountry">
              <option value="filter-by-region" hidden="">
                  filter-by-region
              </option>
              <option value="Africa">Africa</option>
              <option value="America">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
          </select>
      </div>
  );
}

export default Filter
