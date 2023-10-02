import { SelectComponent } from "@/utils/select";
import { Grid, GridItem } from "@chakra-ui/react";

export const EmpleadoComponent = ({ setFields, fields, CarteraEmpleados }) => {
  const handleIndexChangeBuyer = (event) => {
    const buscado = CarteraEmpleados.find(
      (e) => e.nombre == event.target.value
    );
    setFields({ ...fields, empleadoBuyer: buscado.nombre });
  };
  const handleIndexChangeSeller = (event) => {
    const buscado = CarteraEmpleados.find(
      (e) => e.nombre == event.target.value
    );
    setFields({ ...fields, empleadoSeller: buscado.nombre });
  };
  return (
    <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
      <GridItem w="100%">
        <SelectComponent
          options={CarteraEmpleados}
          value={fields.empleadoBuyer}
          handleIndexChange={handleIndexChangeBuyer}
          textDefault="Employee | Buyer"
          param="nombre"
        />
      </GridItem>
      <GridItem w="100%">
      <SelectComponent
          options={CarteraEmpleados}
          value={fields.empleadoSeller}
          handleIndexChange={handleIndexChangeSeller}
          textDefault="Employee | Seller"
          param="nombre"
        />
      </GridItem>
    </Grid>
  );
};
