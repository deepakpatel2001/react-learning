import { useState, useEffect } from 'react';
import CountryCard from './CountryCard';

const CountriesContainer = ({query}) => {
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => setCountryData(data))
    }, []);


    return (
        <>
            <div className="cardContiner">
                {countryData
                    .filter((country) =>
                        country.name.common.toLowerCase().includes(query)
                    )
                    .map((val) => {
                        const data = {
                            name: val.name.common,
                            flag: val.flags.svg,
                            population: val.population,
                            region: val.region,
                            capital: val.capital,
                        };
                        return <CountryCard props={data} />;
                    })}
            </div>
        </>
    );
};

export default CountriesContainer;
