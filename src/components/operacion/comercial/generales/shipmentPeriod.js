import InputPersonalizado from "@/utils/inputPersonalizado";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ShipmentPeriod = ({ value, setFields,fields }) => {
  const [shipmentPeriodFrom, setShipmentPeriodFrom ] = useState(value ? value.slice(0,10) : undefined);
  const [shipmentPeriodTo, setShipmentPeriodTo ] = useState(value ? value.slice(14,24) : undefined);
  useEffect(() => {
    if (shipmentPeriodFrom && shipmentPeriodTo) {
      const dateFormatRegex = /^(200[1-9]|20[1-9]\d)-\d{2}-\d{2}$/; // Expresión regular para el formato "año-mes-día"
      if (dateFormatRegex.test(shipmentPeriodFrom) && dateFormatRegex.test(shipmentPeriodTo)) {
        setFields({...fields, shipmentPeriod: `${shipmentPeriodFrom} to ${shipmentPeriodTo}`});
      }
    }
  }, [shipmentPeriodFrom, shipmentPeriodTo]);
  
  
  
  return (
    <>
      
        <Grid  w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
          <InputPersonalizado
            type="date"
            label="SHIPMENT PERIOD FROM"
            defaultValue={shipmentPeriodFrom}
            onChange={(e) => setShipmentPeriodFrom(e.target.value)}
          />
          </GridItem>
          <GridItem w="100%">
          <InputPersonalizado
            type="date"
            label="SHIPMENT PERIOD TO"
            defaultValue={shipmentPeriodTo}
            onChange={(e) => setShipmentPeriodTo(e.target.value)}
          />
          </GridItem>
        </Grid>

    </>
  );
};
