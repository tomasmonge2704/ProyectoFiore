import { Grid, GridItem,Select } from "@chakra-ui/react";
import { useState } from "react";
export const EmpleadoComponent = ({ setFields, fields,CarteraEmpleados }) => {
    const [indexCartera, setIndexCartera] = useState(undefined);
    const [indexCartera2, setIndexCartera2] = useState(undefined);
    const handleIndexChangeBuyer = (e) => {
        const newIndex = parseInt(e.target.value);
        setIndexCartera(newIndex);
        setFields({...fields,
          empleadoBuyer: CarteraEmpleados[newIndex],
        });
    }
    const handleIndexChangeSeller = (e) => {
        const newIndex = parseInt(e.target.value);
        setIndexCartera2(newIndex);
        setFields({...fields,
          empleadoSeller: CarteraEmpleados[newIndex],
        });
    }
   return (
    <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
      <GridItem w="100%">
      <Select value={indexCartera || indexCartera == 0 ? indexCartera : ""} onChange={handleIndexChangeBuyer}>
      <option value="" disabled>
      Employee | Buyer
      </option>
        {CarteraEmpleados.map((e, index) => (
          <option value={index} key={index}>
            {e.nombre} {e.apellido}
          </option>
        ))}
      </Select>
      </GridItem>
      <GridItem w="100%">
      <Select value={indexCartera2 || indexCartera2 == 0 ? indexCartera2 : ""} onChange={handleIndexChangeSeller}>
      <option value="" disabled>
      Employee | Seller
      </option>
        {CarteraEmpleados.map((e, index) => (
          <option value={index} key={index}>
            {e.nombre} {e.apellido}
          </option>
        ))}
      </Select>
      </GridItem>
    </Grid>
  );
};
