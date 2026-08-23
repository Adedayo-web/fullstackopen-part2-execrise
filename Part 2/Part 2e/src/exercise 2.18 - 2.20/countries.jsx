import axios from "axios";
import { useEffect, useState } from "react";

const Countries = () => {
  const [search, setSearch] = useState("");
  const url = "https://studies.cs.helsinki.fi/restcountries";
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const name = "finland";

  const Filtering = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };

  const allData = () => {
    const request = axios.get(`${url}/api/all`);
    return request.then((response) => response.data);
  };

  const getData = (name) => {
    const request = axios.get(`${url}/api/name/${name}`);
    return request
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!search) {
      setSelectedCountry(null);
      return;
    }

    allData(search).then((initialData) => {
      console.log("promised fulfilled");

      const matches = Object.values(initialData).filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase()),
      );

      setCountries(matches);
    });
  }, [search]);

  const matches = allCountries.filter(
    (country) => {
      country.name.common.toLowerCase().includes(search.toLowerCase());

      setCountries(matches);
    },
    [search, allCountries],
  );

  const showData = (country) => {
    setSelectedCountry(country);
    return (
      <>
        <div>
          <h1>{countries.name.common}</h1>
          <p>Capital {countries.capital}</p>
          <p>Area {countries.area}</p>

          <h2>Language</h2>
          <ul>
            {Object.values(countries.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>

          <img src={countries.flags.png} alt={countries.flags.alt} />
        </div>
      </>
    );
  };

  const apiKey = "56b0b900dd1d8c6127130a3ae97757e2";

  const getWeather = (city) => {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      )
      .then((response) => setWeather(response.data));
  };

  useEffect(() => {
    if (selectedCountry?.capital) {
      getWeather(selectedCountry.capital[0]);
    }
  }, [selectedCountry]);

  return (
    <>
      <p>
        find countries <input type="text" onChange={Filtering} />
      </p>

      {search === "" ? (
        <p></p>
      ) : search.length === 1 ? (
        <p>too many matches, specify another filter</p>
      ) : !countries ? (
        search === "" ? ( // to make the loading disappear when search is empty.
          <p></p>
        ) : (
          // the loading will show when data is being fetched
          <p>loading...</p>
        )
      ) : selectedCountry ? (
        <div>
          <h1>{selectedCountry.name.common}</h1>

          <p>Capital {selectedCountry.capital}</p>

          <p>Area {selectedCountry.area}</p>

          <h2>Languages</h2>

          <ul>
            {Object.values(selectedCountry.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>

          <img
            src={selectedCountry.flags.png}
            alt={selectedCountry.flags.alt}
          />
          <h2>Weather in {selectedCountry.capital}</h2>
          {weather && (
            <>
              <p>Temperature {weather.main.temp}</p>
              <p>{weather.name}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>Wind {weather.wind.speed} m/s</p>
            </>
          )}
        </div>
      ) : (
        <>
          {countries.map((country) => (
            <p key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => showData(country)}>show</button>
            </p>
          ))}
        </>
      )}
    </>
  );
};

export default Countries;
