import { Select } from "@chakra-ui/react";
import { CarteraPackingContext } from "@/components/context/carterasContext";
import { useContext} from "react";
export const SelectPacking = ({productos,setProductos,index,id}) => {
  const { CarteraPacking } = useContext(CarteraPackingContext);
  const handleSelectChange = (event) => {
    const updatedProductos = productos.map((producto) => {
        if (producto.id === id) {
          return {...producto, packing:event.target.value}
        }
        return producto;
      });
      setProductos(updatedProductos);
  };
  return (
        <Select onChange={(e) => handleSelectChange(e)} value={productos[index].packing ? productos[index].packing : ""} variant="filled">
        <option value="" disabled>Product Description</option>
          {CarteraPacking.map((e, index) => (
            <option value={e} key={index}>
              {e}
            </option>
          ))}
        </Select>
  );
};