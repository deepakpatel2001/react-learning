const CountryCard = ({props}) => {
    return (
        <div className="mainCard" id={props.name}>
            <a href="#">
                <div className="imgUpper">
                    <img src={props.flag} alt="" />
                </div>
                <div className="data">
                    <h1>{props.name}</h1>
                    <p>
                        <b>Population: </b>
                        {props.population.toLocaleString('en-IN')}
                    </p>
                    <p>
                        <b>Region: </b>
                        {props.region}
                    </p>
                    <p>
                        <b>Capital: </b> {props.capital}
                    </p>
                </div>
            </a>
        </div>
    );
};

export default CountryCard;
