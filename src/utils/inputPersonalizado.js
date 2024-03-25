import { InputGroup, Input, InputLeftAddon } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function InputPersonalizado({
  type,
  label,
  w,
  onChange,
  defaultValue,
  value,
  variant,
  readOnly,
  hoverEffect
}) {
  const [hovered, setHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(defaultValue);
  useEffect(() => {
    setDisplayValue(defaultValue);
  },[defaultValue])
  const handleMouseEnter = () => {
    setHovered(true);
    setDisplayValue(value);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    // Restaurar el valor predeterminado al dejar de hacer hover
    setDisplayValue(defaultValue || "");
  };

  return (
    <InputGroup w={w}>
      <InputLeftAddon>{label}</InputLeftAddon>
      <Input
        variant={variant || "filled"}
        borderColor={hovered ? "orange.200" : undefined}
        readOnly={readOnly}
        type={type}
        onChange={onChange}
        defaultValue={defaultValue}
        value={hoverEffect ? (hovered ? value : displayValue) : value}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </InputGroup>
  );
}
