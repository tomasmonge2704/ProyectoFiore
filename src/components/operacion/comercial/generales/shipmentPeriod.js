import InputPersonalizado from "@/utils/inputPersonalizado";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ShipmentPeriod = ({ value, setFields,fields }) => {
  const [shipmentPeriodFrom, setShipmentPeriodFrom ] = useState(undefined);
  const [shipmentPeriodTo, setShipmentPeriodTo ] = useState(undefined);
  useEffect(() => {
    if(shipmentPeriodFrom && shipmentPeriodTo) setFields({...fields,shipmentPeriod:`${shipmentPeriodFrom} - ${shipmentPeriodTo}`})
  },[shipmentPeriodFrom,shipmentPeriodTo])
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
            value={shipmentPeriodFrom}
            onChange={(e) => setShipmentPeriodFrom(e.target.value)}
          />
          </GridItem>
          <GridItem w="100%">
          <InputPersonalizado
            type="date"
            label="SHIPMENT PERIOD TO"
            value={shipmentPeriodTo}
            onChange={(e) => setShipmentPeriodTo(e.target.value)}
          />
          </GridItem>
        </Grid>
      )}
    </>
  );
};
