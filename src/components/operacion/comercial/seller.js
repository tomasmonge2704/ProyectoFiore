import { InputSearch } from "@/utils/inputSearch";

export const Seller = ({ fields,handleChange, CarteraProveedores }) => {
  const handleIndexChange = (e) => {
    const index = CarteraProveedores.findIndex(
      (elemento) => elemento.nombre === e.target.value
    );
    handleChange(CarteraProveedores[index],"seller");
  };

  return (
    <InputSearch
      searchParam="nombre"
      placeholder="Search Shipper..."
      cartera={CarteraProveedores}
      selectChangeLogic={handleIndexChange}
      defaultValue={fields.seller.nombre}
    />
  );
};
