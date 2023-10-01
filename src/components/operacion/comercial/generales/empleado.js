import { Grid, GridItem,Select } from "@chakra-ui/react";
export const EmpleadoComponent = ({ setFields, fields,CarteraEmpleados }) => {
    const handleIndexChangeBuyer = (event) => {
      const buscado = CarteraEmpleados.find((e) => e.nombre ==  event.target.value)
        setFields({...fields,
          empleadoBuyer: buscado.nombre,
        });
    }
    const handleIndexChangeSeller = (event) => {
      const buscado = CarteraEmpleados.find((e) => e.nombre ==  event.target.value)
        setFields({...fields,
          empleadoSeller: buscado.nombre,
        });
    }
   return (
    <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
      <GridItem w="100%">
      <Select value={fields.empleadoBuyer} onChange={handleIndexChangeBuyer}>
      <option value="" disabled>
      Employee | Buyer
      </option>
        {CarteraEmpleados.map((e, index) => (
          <option value={e.nombre} key={index}>
            {e.nombre} {e.apellido}
          </option>
        ))}
      </Select>
      </GridItem>
      <GridItem w="100%">
      <Select value={fields.empleadoSeller} onChange={handleIndexChangeSeller}>
      <option value="" disabled>
      Employee | Seller
      </option>
        {CarteraEmpleados.map((e, index) => (
          <option value={e.nombre} key={index}>
            {e.nombre} {e.apellido}
          </option>
        ))}
      </Select>
      </GridItem>
    </Grid>
  );
};
