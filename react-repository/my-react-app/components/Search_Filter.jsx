import Search from './Search';
import Filter from './Filter';

const Search_Filter = ({setQuery}) => {
    return (
        <section className="search-filter">
            <Search setQuery={setQuery} />
            <Filter />
        </section>
    );
};

export default Search_Filter;
