import styles from '../styles/Countries.module.css';
import { Fragment, useEffect, useState } from 'react';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

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

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  const handleRegionSelect = event => {
    setSelectedRegion(event.target.value);
    setCurrentPage(1);
  }

  const filteredCountries = countries.filter(country => {
    const matchSearchTerm = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSelectedRegion = selectedRegion === 'all' || country.region === selectedRegion;
    return matchSearchTerm && matchSelectedRegion;
  });

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <Fragment className={styles.container_main}>
      <div className={styles.container_search}>
          <div className={styles.search}>
            <input type="text" placeholder="Search for a country..." value={searchTerm} onChange={handleSearchInput} />
          </div>
          <div className={styles.filter}>
            <select value={selectedRegion} onChange={handleRegionSelect}>
              <option value="all">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
      </div>
      <main className={styles.container_main}>
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
            {Array.from({ length: Math.ceil(filteredCountries.length / countriesPerPage) }, (_, i) => (
              <li key={i} className={currentPage === i + 1 ? styles.active : ''}>
                <button className={styles.button_pagination} onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Fragment>
  );
};

export default Countries;
