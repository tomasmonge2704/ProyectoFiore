import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
} from "@react-pdf/renderer";
import { Box } from "@chakra-ui/react";
import { styles } from "@/utils/formsStyles";

export default function ShipmentPeriodPDF({ operation }) {
  const [loadPage, setloadPage] = useState(false);
  useEffect(() => {
    setloadPage(true);
  }, []);
  return (
    <Box h="100%">
      <div style={{ marginTop: "20px" }}>
        {loadPage && (
          <PDFViewer style={{ width: "100%", height: "70vh" }}>
            <Document
              title="Shipment Details.pdf"
            >
              <Page size="A4" style={styles.page}>
               <View style={styles.tableShipment}>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>Ref Number</Text>
                    <Text style={styles.tableShipmentRight}>{operation.id}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>Buyer Ref Number</Text>
                    <Text style={styles.tableShipmentRight}>{operation.comercial.fields.buyer.refNumber}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>Shipper</Text>
                    <Text style={styles.tableShipmentRight}>{operation.comercial.fields.seller.nombre}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>Product</Text>
                    <Text style={styles.tableShipmentRight}>{operation.comercial.fields.productos.map((e) => (e.description))}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>Vessel</Text>
                    <Text style={styles.tableShipmentRight}>{operation.logistica.fields.vesselName}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>Container Nr</Text>
                    <Text style={styles.tableShipmentRight}>{operation.logistica.fields.containerNr}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>Seal Nr</Text>
                    <Text style={styles.tableShipmentRight}>{operation.logistica.fields.seals}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>Cartons (Quantity)</Text>
                    <Text style={styles.tableShipmentRight}>{operation.logistica.fields.quantityCartons}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>Net Weight / KGS</Text>
                    <Text style={styles.tableShipmentRight}>{operation.logistica.fields.netWeight}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>Gross Weight / KGS</Text>
                    <Text style={styles.tableShipmentRight}>{operation.logistica.fields.grossWeight}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>ETD</Text>
                    <Text style={styles.tableShipmentRight}>{operation.logistica.fields.etd}</Text>
                </View>
                <View style={styles.tableShipmentRow}>
                    <Text style={styles.tableShipmentLeft}>ETA</Text>
                    <Text style={styles.tableShipmentRight}>{operation.logistica.fields.eta}</Text>
                </View>
               </View>
              </Page>
            </Document>
          </PDFViewer>
        )}
      </div>
    </Box>
  );
}