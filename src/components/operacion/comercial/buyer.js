import { InputSearch } from "@/utils/inputSearch";
export const Buyer = ({ fields,handleChange, CarteraClientes }) => {
  const handleIndexChange = (e) => {
    const index = CarteraClientes.findIndex(
      (elemento) => elemento.nombre === e.target.value
    );
    handleChange(CarteraClientes[index],"buyer")
  };

  return (
    <InputSearch
      cartera={CarteraClientes}
      searchParam="nombre"
      placeholder="Search buyer..."
      selectChangeLogic={handleIndexChange}
      defaultValue={fields.buyer.nombre}
    />
  );
};
