import InputPersonalizado from "@/utils/inputPersonalizado";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ShipmentPeriod = ({ value, setFields,fields }) => {
  const [shipmentPeriodFrom, setShipmentPeriodFrom ] = useState(undefined);
  const [shipmentPeriodTo, setShipmentPeriodTo ] = useState(undefined);
  useEffect(() => {
    if (shipmentPeriodFrom && shipmentPeriodTo) {
      console.log(shipmentPeriodFrom + " " + shipmentPeriodTo)
      const dateFormatRegex = /^(200[1-9]|20[1-9]\d)-\d{2}-\d{2}$/; // Expresión regular para el formato "año-mes-día"
      if (dateFormatRegex.test(shipmentPeriodFrom) && dateFormatRegex.test(shipmentPeriodTo)) {
        setFields({...fields, shipmentPeriod: `${shipmentPeriodFrom} - ${shipmentPeriodTo}`});
      }
    }
  }, [shipmentPeriodFrom, shipmentPeriodTo]);
  
  
  
  return (
    <>
      {value ? (
        <InputPersonalizado
          type="text"
          label="SHIPMENT PERIOD"
          value={value}
          onChange={(e) => setFields({...fields,shipmentPeriod:e.target.value})}
        />
      ) : (
        <Grid  w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
          <InputPersonalizado
            type="date"
            label="SHIPMENT PERIOD FROM"
            value={shipmentPeriodFrom ? shipmentPeriodFrom : ""}
            onChange={(e) => setShipmentPeriodFrom(e.target.value)}
          />
          </GridItem>
          <GridItem w="100%">
          <InputPersonalizado
            type="date"
            label="SHIPMENT PERIOD TO"
            value={shipmentPeriodTo ? shipmentPeriodTo : ""}
            onChange={(e) => setShipmentPeriodTo(e.target.value)}
          />
          </GridItem>
        </Grid>
      )}
    </>
  );
};
