import { InputSearch } from "@/utils/inputSearch";
export const SelectProducts = ({
  productos,
  setProductos,
  id,
  CarteraProducts,
}) => {
  const selectChangeLogic = (event) => {
    const updatedProductos = productos.map((producto) => {
      if (producto.id === id) {
        return {...producto, description:event.target.value}
      }
      return producto;
    });
    setProductos(updatedProductos);
  }
  return (
    <InputSearch
    selectChangeLogic={selectChangeLogic}
      searchParam="description"
      placeholder="Search Product..."
      cartera={CarteraProducts}
    />
  );
};
