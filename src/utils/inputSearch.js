import { Input, Menu, MenuList, MenuItem, Box } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";

export const InputSearch = ({
  cartera,
  placeholder,
  searchParam,
  selectChangeLogic,
  defaultValue
}) => {
  const [searchText, setSearchText] = useState(defaultValue || "");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const filteredArray = cartera.filter((elemnt) =>
      elemnt[searchParam].toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredArray);
  }, [searchText, searchParam, cartera]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setDropdownVisible(true);
  };

  const handleSelectChange = (event) => {
    selectChangeLogic(event);
    setSearchText(event.target.value);
    setDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      // Clic fuera del componente, oculta el desplegable
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    // Agrega un manejador de eventos al documento para detectar clics fuera del componente
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Limpia el manejador de eventos al desmontar el componente
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef} style={{width:"100%"}}>
      <Input
        placeholder={placeholder}
        variant="filled"
        value={searchText}
        onChange={handleSearchChange}
      />
      <Box position="absolute" w="100%" zIndex="sticky">
        <Menu isOpen={isDropdownVisible && searchResults.length > 0}>
          <MenuList>
            {searchResults.length > 0 &&
              searchResults.map((e, index) => (
                <MenuItem
                  key={index}
                  onClick={(event) => handleSelectChange(event)}
                  value={e[searchParam]}
                >
                  {e[searchParam]}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </Box>
    </div>
  );
};
