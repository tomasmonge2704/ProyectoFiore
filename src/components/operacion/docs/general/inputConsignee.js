import { InputSearch } from "@/utils/inputSearch";

export const InputConsignee = ({ fields,placeholder,defaultValue, setFields,param, Cartera }) => {
  const handleIndexChange = (e) => {
    const index = Cartera.findIndex(
      (elemento) => elemento.nombre === e.target.value
    );
    setFields({
      ...fields,
      [param]: Cartera[index],
    });
  };

  return (
    <InputSearch
      searchParam="nombre"
      selectChangeLogic={handleIndexChange}
      placeholder={placeholder}
      cartera={Cartera}
      defaultValue={defaultValue}
    />
  );
};