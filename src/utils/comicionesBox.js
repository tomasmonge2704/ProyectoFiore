import InputPersonalizado from "./inputPersonalizado";
export const ComisionesBox = ({value, handleChange,defaultValue, param,set,hoverEffect }) => {
  
  return (
    <InputPersonalizado
      label="COMISIONES"
      defaultValue={defaultValue}
      hoverEffect={hoverEffect}
      value={value}
      onChange={(e) => handleChange(e, param,set)}
    />
  );
};
