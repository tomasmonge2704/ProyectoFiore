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
export default function PurchaseForm({ fields, productos }) {

  return (
            <Document
              title={`Purchase Conf${
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
                    PURCHASE CONFIRMATION NR. {fields.empresaRefNumber}
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
                      <Text style={styles.textDato}>{transformDate(fields.date)}</Text>
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
                    <Text style={styles.textDato}>
                      {fields.seller.direccion}
                    </Text>
                    <View style={styles.grid2}>
                      <Text style={styles.textDato}>
                        {fields.empresa.direccion}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.grid}>
                    <Text style={styles.textDato}>
                      {fields.seller.direccion2}
                    </Text>
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
                      <Text style={styles.textDato}>TO BE CONFIRMED</Text>
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
                              USD {prod.unitPricePurchase} /MT
                            </Text>
                          </View>
                          <View style={styles.borderTable}>
                            {" "}
                            <Text style={styles.textDato}>
                              {convertirAMoneda(
                                prod.unitPricePurchase * prod.netWeight
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
                          {convertirAMoneda(fields.totalPurchase)}
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
                      {fields.empresa.direccion} {fields.empresa.direccion2} (Tax ID: {fields.empresa.vatNumber})
                    </Text>
                  </View>
                </View>
              </Page>
            </Document>
  );
}
