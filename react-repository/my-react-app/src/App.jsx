import Header from '../components/Header'
import Search_Filter from '../components/Search_Filter'
import '../components/style.css'
import CountriesContainer from '../components/CountriesContainer'
import { useState } from 'react';
const App = () => {
    const [query, setQuery] = useState('');
  return (
      <>
          <Header />
          <Search_Filter setQuery={setQuery} />
          <main>
              <CountriesContainer query={query} />
          </main>
      </>
  );
}

export default App