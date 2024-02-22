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
        const productoEncontrado2 =  CarteraProducts.find((e) => e.description === producto.description);
        return {...producto, description:event.target.value, family:productoEncontrado2?.family,famili2:productoEncontrado2?.famili2}
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
