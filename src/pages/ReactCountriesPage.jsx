import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import InputText from "../components/InputText";
import { Main } from "../components/Main";
import axios from "axios";
import Countries from "../components/Countries";

export default function ReactCountriesPage() {
  const [countryFilter, setCountryFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    async function getCountries() {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countriesData = response.data;
        setCountries(countriesData);
      } catch (error) {
        console.error('Erro ao buscar países:', error.message);
      }
    }
  
    getCountries();
  }, []);

  function handleCountryFilterChange(newCountryFilter) {
    setCountryFilter(newCountryFilter);
    const filteredCountries = countries.filter((country) => 
      country.name.common.toLowerCase().includes(newCountryFilter.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  }  
  
  return (
    <>
      <Header>
        <h1>React Countries</h1>
      </Header>

      <Main>
        <ul>
          <li>O conteúdo fica aqui.</li>
        </ul>

        <InputText
          id="inputContryFilter" 
          labelDescription="Informe o nome do país:" 
          inputValue={countryFilter}
          onInputChange={handleCountryFilterChange}
          autoFocus
        />

        <Countries countries={filteredCountries} />

      </Main>
    </>
  )
}
