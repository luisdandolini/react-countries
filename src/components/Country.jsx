import Item from "./Item";

export default function Country({ country }) {
  const demographDensity = country.population / country.area
  
  return (
    <div>
      {country && country.name && (
        <div className="border p-2 m-2 flex flex-row items-center space-x-2">
          <img className="w-48" src={country.flags.png} alt={country.name} />
          <ul>
            <li><Item label="Nome:"> {country.name.common}</Item></li>
            <li><Item label="Capital:"></Item> {country.capital}</li>
            <li><Item label="Região:"></Item> {country.region}</li>
            <li><Item label="População:"></Item> {country.population}</li>
            <li><Item label="Área Total:"></Item> {country.area}</li>
            <li><Item label="Densidade Demográfica:"></Item> {demographDensity.toFixed(2)}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
