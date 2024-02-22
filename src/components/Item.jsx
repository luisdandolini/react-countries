export default function Item({ children: value = 'Valor', label = 'Nome' }) {
  return (
    <span>
      <strong>{label}</strong>
      {value}
    </span>
  )
}