import styles from '../styles/Countries.module.css';
import { useEffect, useState } from 'react';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(12);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(country => ({
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital?.[0],
          flag: country.flags.png,
        }));
        setCountries(formattedData);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);  

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <main>
      {currentCountries.map(country => (
        <div className={styles.container} key={country.name}>
          <img src={country.flag} alt={country.name} /> 
          <h1 className={styles.country_name}>{country.name}</h1>
          <p className={styles.country}>Population: {country.population}</p>
          <p className={styles.country}>Region: {country.region}</p>
          <p className={styles.country}>Capital: {country.capital}</p>
        </div>
      ))}
      <div className={styles.pagination}>
        <ul className={styles.pagination}>
          {Array.from({ length: Math.ceil(countries.length / countriesPerPage) }, (_, i) => (
            <li key={i} className={currentPage === i + 1 ? styles.active : ''}>
              <button className={styles.button_pagination} onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Countries;
