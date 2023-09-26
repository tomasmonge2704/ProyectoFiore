import { InputSearch } from "@/utils/inputSearch";
export const Buyer = ({ buyer,fields,setFields, CarteraClientes }) => {
  const handleIndexChange = (e) => {
    const index = CarteraClientes.findIndex(
      (elemento) => elemento.nombre === e.target.value
    );
    setFields({
      ...fields,
      buyer: CarteraClientes[index],
    });
  };

  return (
    <InputSearch
      cartera={CarteraClientes}
      searchParam="nombre"
      placeholder="Search buyer..."
      selectChangeLogic={handleIndexChange}
      defaultValue={buyer.nombre}
    />
  );
};
