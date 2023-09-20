import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image
} from "@react-pdf/renderer";
import { Box } from "@chakra-ui/react";
import { useStore } from "@/store/operation";
import TablePurchase from "../../comercial/ordenCompra/tablePurchase";

const styles = StyleSheet.create({
  page: {
    flexDirection: "portrait",
    width: 595.276, // Ancho en puntos (21.01 cm)
    height: 841.89, // Alto en puntos (29.71 cm),
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: "flex", // Usamos flexbox para alinear verticalmente el contenido
    flexDirection: "column", // Alinear contenido en columna
  },
  title: {
    fontSize: 15,
    backgroundColor: "rgb(35 28 68)", // Corregido: separar valores RGB con comas
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  text: {
    fontSize: 7,
  },
  negrita: {
    fontSize: 7,
    fontWeight:"ultrabold"
  },
  textDato: {
    fontSize: 7,
    backgroundColor: "rgb(210, 214, 213)",
  },
  line:{
    backgroundColor:"grey",
    height:2,
    marginBottom:2
  },
  footer:{
    color:"grey",
    textAlign:"center"
  },
  image: {
    width: "120px",
    height: "70px",
  },
  imageContainer: {
    marginLeft: "75%",
  },
  grid: {
    display: "flex", // Usamos flexbox para dividir en 2
    flexDirection: "row", // División en fila
    justifyContent: "space-between", // Espacio entre los elementos
  },
  grid2: {
    display: "flex", // Usamos flexbox para dividir en 2
    flexDirection: "row", // División en fila
    gap: 10,
    flexBasis: "50%", // Ancho de cada elemento en la división
  },
  vSpacer: {
    height: 20,
  },
  vSpacerXs: {
    height: 3,
  },
  vSpacerMd: {
    height: 10,
  },
  borderTable: {
    margin:0,
    width: "100%",
    textAlign: "center",
    verticalAlign:"middle",
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "black",
    backgroundColor: "rgb(210, 214, 213)",
  },
  borderTableTitle: {
    margin:0,
    width: "100%",
    textAlign: "center",
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "black",
  },
  tableContainer: {
    width: "100%",
  },
  tableRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
  tableTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
});

export default function PdfDocsIntructions() {
    const operation = useStore((state) => state.operation);
    const fields = operation.comercial.fields;
    const productos = operation.comercial.fields.productos;
  const [loadPage, setloadPage] = useState(false);
  useEffect(() => {
    setloadPage(true);
  }, []);
  return (
    <Box h="100%">
      <div style={{ marginTop: "20px" }}>
        {loadPage && (
          <PDFViewer style={{ width: "100%", height:"70vh" }}>
            <Document title="proforma.pdf">
              <Page size="A4" style={styles.page}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} src="/logo.jpg" />
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>INSTRUCCIONES PARA DOCUMENTOS</Text>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>ORDER NUMBER:</Text>
                      <Text style={styles.textDato}>
                        {fields.buyer.refNumber}
                      </Text>
                    </View>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>DATE:</Text>
                      <Text style={styles.textDato}>{fields.date}</Text>
                    </View>
                  </View>
                  <View style={styles.vSpacerXs}></View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>SUPPLIER REF. NUMBER:</Text>
                      <Text style={styles.textDato}>
                        {fields.seller.refNumber}
                      </Text>
                    </View>
                    <View style={styles.grid2}></View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.grid}>
                    <Text style={styles.negrita}>SHIPPER:</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>BUYER:</Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.textDato}>{fields.seller.nombre}</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        {fields.empresa.nombre}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.textDato}>{fields.seller.direccion}</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        {fields.empresa.direccion}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.textDato}>{fields.seller.direccion2}</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        {fields.empresa.direccion2}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.textDato}>{fields.seller.taxId}</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        VAT NUMBER: {fields.empresa.vatNumber}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.vSpacerMd}></View>
                  <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>CONSIGNEE:</Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                      TO BE CONFIRMED
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                      (DOCS INSTRUCTION WILL FOLLOW SHORTLY)
                      </Text>
                    </View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>
                      WE CONFIRM HAVING PURCHASED:
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <TablePurchase
                    productos={productos}
                    fields={fields}
                    styles={styles}
                  />
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>ORIGIN:</Text>
                      <Text style={styles.textDato}>
                        {fields.seller && fields.seller.origin}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>PLANT NUMBER:</Text>
                      <Text style={styles.textDato}>
                        {fields.seller && fields.seller.plantNumber}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>BRAND:</Text>
                      <Text style={styles.textDato}>
                        {fields.seller && fields.seller.brand}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>PRODUCTION DATE:</Text>
                      <Text style={styles.textDato}>
                        {fields.productionDate}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>SHELF LIFE:</Text>
                      <Text style={styles.textDato}>{fields.shelfLife}</Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>DESTINATION PORT:</Text>
                      <Text style={styles.textDato}>
                        {fields.destinationPort}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>DESTINATION COUNTRY:</Text>
                      <Text style={styles.textDato}>
                        {fields.destinationCountry}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>SHIPMENT PERIOD:</Text>
                      <Text style={styles.textDato}>
                        {fields.shipmentPeriod}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>DELIVERY TERMS:</Text>
                      <Text style={styles.textDato}>
                        {fields.deliveryTermsPurchase}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>PAYMENT TERMS:</Text>
                      <Text style={styles.textDato}>
                        {fields.paymentTermsPurchase}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
                  <View
                    style={{display: "flex",flexDirection: "row", gap: 10}}>
                    <Text style={styles.negrita}>- INSPECTED, APPROVED & ELEGIBLE FOR EXPORT TO:
                    </Text>
                    <Text style={styles.textDato}>
                      {fields.destinationCountry}
                    </Text>
                  </View>
                  <View style={{marginTop:3}}>
                      <Text style={styles.negrita}>
                        - PRODUCTION / EXPIRATION DATE (DD/MM/YYYY) OR (MM/YYYY)
                        FORMAT ARE REQUIRED ON ALL CARTONS
                      </Text>
                  </View>
                  <View style={{marginTop:3}}>
                      <Text style={styles.negrita}>- FLOOR LOADED</Text>
                  </View>
                  <View style={{marginTop:3}}>
                      <Text style={styles.negrita}>- FOR MIX LOADS, HEAVY HEN LEG QUARTERS MUST BE AT THE DOOR OF THE CONTAINER</Text>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.line}></View>
                  <View style={styles.footer}>
                    <Text style={styles.text}>{fields.empresa.nombre}</Text>
                    <Text style={styles.text}>{fields.empresa.direccion} (CP {fields.empresa.vatNumber})</Text>
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