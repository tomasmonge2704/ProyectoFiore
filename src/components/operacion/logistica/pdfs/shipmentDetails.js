import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { Box } from "@chakra-ui/react";
import { styles } from "@/utils/formsStyles";

export default function ShipmentPeriodPDF({ operation, fields, productos }) {
  const [loadPage, setloadPage] = useState(false);
  useEffect(() => {
    setloadPage(true);
  }, []);
  return (
    <Box h="100%">
      <div style={{ marginTop: "20px" }}>
        {loadPage && (
          <PDFViewer style={{ width: "100%", height: "70vh" }}>
            <Document title={"Shipment Details " + operation.id +".pdf"}>
              <Page size="A4" style={styles.page}>
                <View style={styles.imageContainer}>
                  <Image
                    src={
                      fields.empresa.empresa == "DPL"
                        ? "/logo-DPL.png"
                        : "/logo-Duplo.png"
                    }
                  />
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>
                    SHIPMENT DETAILS {operation.id}
                  </Text>
                  <View style={styles.date}>
                    <Text style={styles.negrita}>DATE:</Text>
                    <Text style={styles.textDato}>{fields.date}</Text>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.tableContainer}>
                    <View style={styles.tableTitle}>
                      <View style={{ width: "150%" }}>
                        <View style={styles.borderTableTitle}>
                          <Text style={styles.negrita}>PRODUCT</Text>
                        </View>
                      </View>
                      <View style={styles.borderTableTitle}>
                        <Text style={styles.negrita}>PACKING</Text>
                      </View>
                      <View style={styles.borderTableTitle}>
                        <Text style={styles.negrita}>QUANTITY (CARTONS)</Text>
                      </View>

                      <View style={styles.borderTableTitle}>
                        <Text style={styles.negrita}>NET WEIGHT (KGS)</Text>
                      </View>
                      <View style={styles.borderTableTitle}>
                        <Text style={styles.negrita}>GROSS WEIGHT(MT)</Text>
                      </View>
                    </View>
                    {productos.length &&
                      productos.map((prod, index) => (
                        <View style={styles.tableRow} key={index}>
                          <View style={{ width: "150%" }}>
                            <View style={styles.borderTable}>
                              {" "}
                              <Text style={styles.textDato}>
                                {prod.description}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.borderTable}>
                            {" "}
                            <Text style={styles.textDato}>{prod.packing}</Text>
                          </View>
                          <View style={styles.borderTable}>
                            {" "}
                            <Text style={styles.textDato}>{prod.quantity}</Text>
                          </View>

                          <View style={styles.borderTable}>
                            <Text style={styles.textDato}>
                              {prod.netWeight}
                            </Text>
                          </View>
                          <View style={styles.borderTable}>
                            <Text style={styles.textDato}>
                              {prod.grossWeight}
                            </Text>
                          </View>
                        </View>
                      ))}
                    <View style={styles.tableRow}>
                      <View style={{ width: "150%" }}></View>
                      <View style={{ width: "100%" }}></View>
                      <View style={styles.borderTable}>
                        {" "}
                        <Text style={styles.textDato}>{operation.comercial.fields.totalQuantityCartons}</Text>
                      </View>
                      <View style={styles.borderTable}>
                        {" "}
                        <Text style={styles.textDato}>{operation.comercial.fields.totalNetWeight}</Text>
                      </View>
                      <View style={styles.borderTable}>
                        {" "}
                        <Text style={styles.textDato}>{operation.comercial.fields.totalGrossWeight}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>BUYER REF. NUMBER:</Text>
                      <Text style={styles.textDato}>
                        {fields.buyer.refNumber}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>SHIPPER:</Text>
                      <Text style={styles.textDato}>
                        {fields.seller.nombre}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>DESTINATION:</Text>
                      <Text style={styles.textDato}>
                        {fields.destinationPort}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>VESSEL:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.vessel}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>ETD:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.etd}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>ETA:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.eta}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>CONTAINER NR.:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.containerNr}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>SALES ORDER:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.seals}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>SEALS:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.seals}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
                  <Image
                    style={styles.firma}
                    src={
                      fields.empresa.empresa == "DPL"
                        ? "/Firma-DPL.png"
                        : "/Firma-Duplo.png"
                    }
                  />
                  <View style={styles.vSpacer}></View>
                  <View style={styles.line}></View>
                  <View style={styles.footer}>
                    <Text style={styles.text}>{fields.empresa.nombre}</Text>
                    <Text style={styles.text}>
                      {fields.empresa.direccion} (CP {fields.empresa.vatNumber})
                    </Text>
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
