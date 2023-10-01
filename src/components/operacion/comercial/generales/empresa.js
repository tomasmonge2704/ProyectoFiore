import { Select } from "@chakra-ui/react";
export const Empresa = ({ fields,setFields,CarteraBancaria }) => {
  const handleIndexChange = (event) => {
    const buscado = CarteraBancaria.find((e) => e.nombre ==  event.target.value)
    console.log(buscado)
    setFields({...fields,
      empresa: buscado,
    });
  };
  return (
      <Select value={fields.empresa.nombre} onChange={handleIndexChange}>
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