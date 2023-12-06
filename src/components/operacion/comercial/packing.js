import { Select } from "@chakra-ui/react";
export const SelectPacking = ({productos,handleChange,index,id,CarteraPacking}) => {
  const handleSelectChange = (event) => {
    const updatedProductos = productos.map((producto) => {
        if (producto.id === id) {
          return {...producto, packing:event.target.value}
        }
        return producto;
      });
      handleChange(updatedProductos,"productos");
  };
  return (
        <Select onChange={(e) => handleSelectChange(e)} value={productos[index].packing ? productos[index].packing : ""} variant="filled">
        <option value="" disabled>Packing</option>
          {CarteraPacking.map((e, index) => (
            <option value={e.name} key={index}>
              {e.name}
            </option>
          ))}
        </Select>
  );
};