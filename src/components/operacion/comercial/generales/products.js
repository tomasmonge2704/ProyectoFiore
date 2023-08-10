import { Select } from "@chakra-ui/react";
import { CarteraProductsContext } from "@/components/context/carterasContext";
import { useContext} from "react";
export const SelectProducts = ({productos,setProductos,index,id}) => {
  const { CarteraProducts } = useContext(CarteraProductsContext);
  const handleSelectChange = (event) => {
    const updatedProductos = productos.map((producto) => {
        if (producto.id === id) {
          return {...producto, description:event.target.value}
        }
        return producto;
      });
      setProductos(updatedProductos);
  };
  return (
        <Select onChange={(e) => handleSelectChange(e)} value={productos[index].description ? productos[index].description : ""} variant="filled">
        <option value="" disabled>Product Description</option>
          {CarteraProducts.map((e, index) => (
            <option value={e.description} key={index}>
              {e.description}
            </option>
          ))}
        </Select>
  );
};