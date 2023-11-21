import {
  Document,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { styles } from "@/utils/formsStyles";

export default function ShipmentPeriodPDF({ operation, fields, productos }) {

  return (
            <Document title={"Shipment Details " + operation.id +".pdf"}>
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
                        <Text style={styles.negrita}>NET WEIGHT (MT)</Text>
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
                            <Text style={styles.textDato}>{prod.quantityCartons}</Text>
                          </View>

                          <View style={styles.borderTable}>
                            <Text style={styles.textDato}>
                              {prod.netWeightLogistica} MT
                            </Text>
                          </View>
                          <View style={styles.borderTable}>
                            <Text style={styles.textDato}>
                              {prod.grossWeight} MT
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
                        <Text style={styles.textDato}>{operation.comercial.fields.totalNetWeight} MT</Text>
                      </View>
                      <View style={styles.borderTable}>
                        {" "}
                        <Text style={styles.textDato}>{operation.comercial.fields.totalGrossWeight} MT</Text>
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
                      <Text style={styles.negrita}>SALES ORDER:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.seals}
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
                        {operation.logistica.fields.vesselName}
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
                      <Text style={styles.negrita}>SEALS:</Text>
                      <Text style={styles.textDato}>
                        {operation.logistica.fields.seals}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                </View>
              </Page>
            </Document>
  );
}
