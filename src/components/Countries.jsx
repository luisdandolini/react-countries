import Country from "./Country";

export default function Countries({ countries }) {
  return (
    <div className="border p-2">
      <h2 className="text-center font-semibold">{countries.length} país(es)</h2>

      {countries.length > 0 && countries.map((country, index) => (
        <Country key={index} country={country} />
      ))}
    </div>
  )
}