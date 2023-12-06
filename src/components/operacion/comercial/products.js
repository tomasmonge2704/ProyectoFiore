import { InputSearch } from "@/utils/inputSearch";
export const SelectProducts = ({
  productos,
  handleChange,
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
    handleChange(updatedProductos,"productos");
  }
  const productoEncontrado = productos.find((e) => e.id === id);
  return (
    <InputSearch
    selectChangeLogic={selectChangeLogic}
      searchParam="description"
      placeholder="Search Product..."
      cartera={CarteraProducts}
      defaultValue={productoEncontrado.description}
    />
  );
};
