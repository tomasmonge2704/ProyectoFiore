import { InputSearch } from "@/utils/inputSearch";

export const Seller = ({ setFields, CarteraProveedores,seller }) => {
  const handleIndexChange = (e) => {
    const index = CarteraProveedores.findIndex(
      (elemento) => elemento.nombre === e.target.value
    );
    setFields((prevPurchase) => ({
      ...prevPurchase,
      seller: CarteraProveedores[index],
    }));
  };

  return (
    <InputSearch
      searchParam="nombre"
      placeholder="Search Shipper..."
      cartera={CarteraProveedores}
      selectChangeLogic={handleIndexChange}
      defaultValue={seller.nombre}
    />
  );
};
