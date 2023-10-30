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
import { convertirAMoneda } from "@/utils/convertInt";

export default function SaleForm({ operation, fields, productos }) {
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
              title="Invoice.pdf"
            >
              <Page size="A4" style={styles.page}>
                <View style={styles.imageContainer}>
                  <Image
                  style={styles.image}
                    src={
                      fields.empresa.empresa == "DPL"
                        ? "/Logo-DPL.png"
                        : "/Logo-Duplo.png"
                    }
                  />
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>EXPORT INVOICE</Text>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>INVOICE NUMBER:</Text>
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
                    <Text style={styles.negrita}>{fields.buyer.nombre}</Text>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.text}>{fields.buyer.direccion}</Text>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.text}>{fields.buyer.direccion2}</Text>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.text}>{fields.buyer.vatNumber}</Text>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.tableContainer}>
                    <View style={styles.tableTitle}>
                      <View style={styles.borderTableTitle}>
                        <Text style={styles.negrita}>QUANTITY</Text>
                      </View>
                      <View style={{ width: "150%" }}>
                        <View style={styles.borderTableTitle}>
                          <Text style={styles.negrita}>PRODUCT</Text>
                        </View>
                      </View>
                      <View style={styles.borderTableTitle}>
                        <Text style={styles.negrita}>PACKING</Text>
                      </View>
                      <View style={styles.borderTableTitle}>
                        <Text style={styles.negrita}>UNIT PRICE</Text>
                      </View>
                      <View style={styles.borderTableTitle}>
                        <Text style={styles.negrita}>TOTAL AMOUNT</Text>
                      </View>
                    </View>
                    {productos.length &&
                      productos.map((prod, index) => (
                        <View style={styles.tableRow} key={index}>
                          <View style={styles.borderTable}>
                            {" "}
                            <Text style={styles.textDato}>
                              {prod.netWeight} MT
                            </Text>
                          </View>
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
                            <Text style={styles.textDato}>
                              USD {prod.unitPriceSale} /MT
                            </Text>
                          </View>
                          <View style={styles.borderTable}>
                            {" "}
                            <Text style={styles.textDato}>
                              USD{" "}
                              {convertirAMoneda(
                                prod.unitPriceSale * prod.netWeight
                              ) || 0}
                            </Text>
                          </View>
                        </View>
                      ))}
                    <View style={styles.tableRow}>
                      <View style={styles.borderTable}>
                        {" "}
                        <Text style={styles.textDato}>
                          {fields.totalNetWeight} MT
                        </Text>
                      </View>
                      <View style={{ width: "150%" }}></View>
                      <View style={{ width: "100%" }}></View>
                      <View style={{ width: "100%" }}></View>
                      <View style={styles.borderTable}>
                        {" "}
                        <Text style={styles.textDato}>
                          USD {convertirAMoneda(fields.totalSale)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
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
                      <Text style={styles.negrita}>ORIGIN:</Text>
                      <Text style={styles.textDato}>
                        {fields.seller && fields.seller.country}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>BRAND | PLANT NR.:</Text>
                      <Text style={styles.textDato}>
                        {fields.seller.brand && fields.seller.brand + " | " + fields.seller.plantNumber}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>DESTINATION</Text>
                      <Text style={styles.textDato}>
                        {fields.destinationPort && fields.destinationPort + ", " + fields.destinationCountry}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>VESSEL:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.vesselName}
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
                      <Text style={styles.negrita}>SEALS:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.seals}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                  <View style={styles.grid}>
                    <View style={styles.grid2}>
                      <Text style={styles.negrita}>PURCHASE ORDER NR.:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.seals}
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
                  <View style={styles.vSpacer}></View>
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
                  <View style={styles.grid}>
                    <View>
                      <Text style={styles.negrita}>BANK DETAILS:</Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View>
                      <Text style={styles.textDato}>
                        Beneficiary Bank:{" "}
                        {fields.empresa.bank &&
                          fields.empresa.bank.beneficiaryBank}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View>
                      <Text style={styles.textDato}>
                        Bank Address:{" "}
                        {fields.empresa.bank && fields.empresa.bank.bankAdress}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View>
                      <Text style={styles.textDato}>
                        Swift Code:{" "}
                        {fields.empresa.bank && fields.empresa.bank.swiftCode}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View>
                      <Text style={styles.textDato}>
                        Beneficiary Name:{" "}
                        {fields.empresa.bank &&
                          fields.empresa.bank.beneficiaryName}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <View>
                      <Text style={styles.textDato}>
                        Beneficiary Account Number:{" "}
                        {fields.empresa.bank &&
                          fields.empresa.bank.beneficiaryAccountNumber}
                      </Text>
                    </View>
                  </View>
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
