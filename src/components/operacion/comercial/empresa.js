import { Select } from "@chakra-ui/react";
export const Empresa = ({ operation,handleChange,CarteraBancaria }) => {
  const handleIndexChange = (event) => {
    const buscado = CarteraBancaria.find((e) => e.nombre ==  event.target.value)
    handleChange(buscado,"empresa");
  };
  return (
      <Select value={operation.comercial.fields.empresa.nombre} onChange={handleIndexChange}>
      <option value="" disabled>
        Empresa
      </option>
        {CarteraBancaria.map((e, index) => (
          <option value={e.nombre} key={index}>
            {e.nombre}
          </option>
        ))}
      </Select>
  );
};