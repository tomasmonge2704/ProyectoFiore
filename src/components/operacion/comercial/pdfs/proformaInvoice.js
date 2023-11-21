import {
  Document,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { styles } from "@/utils/formsStyles";
import { convertirAMoneda } from "@/utils/convertInt";
import { transformDate } from "@/utils/functions";
export default function SaleForm({ fields, productos }) {

  return (
            <Document
              title={`Proforma Inv${
                fields.empresaRefNumber && " " + fields.empresaRefNumber
              }.pdf`}
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
                  <Text style={styles.title}>
                    PROFORMA INVOICE NR. {fields.empresaRefNumber}
                  </Text>
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
                        Correspondent Bank: {fields.empresa.bank && fields.empresa.bank.correspondentBank}
                      </Text>
                    </View>
                  </View>
                  {fields.empresa.bank?.ABA && <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        ABA: {fields.empresa.bank.ABA}
                      </Text>
                    </View>
                  </View>}
                  {fields.empresa.bank?.swift && <View style={styles.grid}>
                    <View></View>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        Swift Code: {fields.empresa.bank.swift}
                      </Text>
                    </View>
                  </View>}
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
                          {convertirAMoneda(fields.totalSale)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
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
                      {fields.shipmentPeriodFrom && transformDate(fields.shipmentPeriodFrom)}{fields.shipmentPeriodTo && ` to ${transformDate(fields.shipmentPeriodTo)}`}
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
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                  >
                    <Text style={styles.negrita}>
                      - INSPECTED, APPROVED & ELEGIBLE FOR EXPORT TO:
                    </Text>
                    <Text style={styles.textDato}>
                      {fields.destinationCountry}
                    </Text>
                  </View>
                  <View style={{ marginTop: 3 }}>
                    <Text style={styles.textDato}>
                    {fields.comentarios && fields.comentarios}
                    </Text>
                  </View>
                  <View style={styles.vSpacer}></View>
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
  );
}
