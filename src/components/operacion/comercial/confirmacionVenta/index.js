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
import SaleTable from "./saleTable";

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
    backgroundColor: "#ea5c3e", // Corregido: separar valores RGB con comas
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
    fontSize: 7
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
  line:{
    backgroundColor:"grey",
    height:2,
    marginBottom:2
  },
  footer:{
    color:"grey",
    textAlign:"center"
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

export default function SaleForm({ fields, productos }) {
  const [loadPage, setloadPage] = useState(false);
  useEffect(() => {
    setloadPage(true);
  }, []);
  return (
    <Box h="100%">
      <div style={{ marginTop: "20px" }}>
        {loadPage && (
          <PDFViewer style={{ width: "100%",height:"70vh" }}>
            <Document title={`Proforma Inv${fields.empresaRefNumber && " " + fields.empresaRefNumber}.pdf`}>
              <Page size="A4" style={styles.page}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} src="/logo.jpg" />
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>PROFORMA INVOICE NR. {fields.empresaRefNumber}</Text>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>ORDER NUMBER:</Text>
                      <Text style={styles.textDato}>
                        {fields.empresaRefNumber}
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
                      <Text style={styles.negrita}>PO NUMBER:</Text>
                      <Text style={styles.textDato}>
                        {fields.buyer.refNumber}
                      </Text>
                    </View>
                    <View style={styles.grid2}></View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.grid}>
                    <Text style={styles.negrita}>BUYER:</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>SELLER:</Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.negrita}>{fields.buyer.nombre}</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        {fields.empresa.nombre}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.text}>{fields.buyer.direccion}</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        {fields.empresa.direccion}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.text}>{fields.buyer.direccion2}</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        {fields.empresa.direccion2}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.text}>{fields.buyer.vatNumber}</Text>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        VAT NUMBER: {fields.empresa.vatNumber}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>BANK DETAILS:</Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        Beneficiary Bank:{" "}
                        {fields.empresa.bank &&
                          fields.empresa.bank.beneficiaryBank}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        Bank Address:{" "}
                        {fields.empresa.bank && fields.empresa.bank.bankAdress}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        Swift Code:{" "}
                        {fields.empresa.bank && fields.empresa.bank.swiftCode}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        Beneficiary Name:{" "}
                        {fields.empresa.bank &&
                          fields.empresa.bank.beneficiaryName}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        Beneficiary Account Number:{" "}
                        {fields.empresa.bank &&
                          fields.empresa.bank.beneficiaryAccountNumber}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        Correspondent Bank: FALTA
                      </Text>
                    </View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>
                        WE CONFIRM HAVING SOLD:
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <SaleTable
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
                        {fields.deliveryTermsSale}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>PAYMENT TERMS:</Text>
                      <Text style={styles.textDato}>
                        {fields.paymentTermsSale}
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
