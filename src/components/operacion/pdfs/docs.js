import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "@/utils/formsStyles";
import { transformDate } from "@/utils/functions";

export default function PdfDocsIntructions({ operation }) {
  const fieldsComercial = operation.comercial.fields;
  const fieldsDocs = operation.docs.fields;
  const descriptionOfGoods =
    operation.docs.fields.descriptionGoods !== ""
      ? operation.docs.fields.descriptionGoods
      : operation.comercial.fields.productos
          .map((e) => `-${e.description}`)
          .join("\n");
  const descriptionOfGoods2 =
    operation.docs.fields.descriptionGoods2 !== ""
      ? operation.docs.fields.descriptionGoods2
      : operation.comercial.fields.productos
          .map((e) => `-${e.description}`)
          .join("\n");
  return (
    <Document title="Docs Instructions.pdf">
      <Page size="A4" style={styles.page}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            src={
              operation.comercial.fields.empresa.empresa == "DPL"
                ? "/Logo-DPL.png"
                : "/Logo-Duplo.png"
            }
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>DOCS INSTRUCTIONS {operation.id}</Text>
          <View style={styles.grid}>
            <View style={styles.grid2}>
              <Text style={styles.negrita}>ORDER NUMBER:</Text>
              <Text style={styles.textDato}>{fieldsComercial.seller.refNumber}</Text>
            </View>
            <View style={styles.grid2}>
              <Text style={styles.negrita}>DATE:</Text>
              <Text style={styles.textDato}>
                {transformDate(fieldsDocs.date)}
              </Text>
            </View>
          </View>
          <View style={styles.vSpacerXs}></View>
          <View style={styles.vSpacerXs}></View>
          <View style={styles.grid}>
            <Text style={styles.negrita}>DOCUMENT REQUESTED:</Text>
            <View>
              {operation.docs.fields.documentRequested.map((e, index) => (
                <Text key={index} style={styles.textDato}>
                  {e.label}
                </Text>
              ))}
            </View>
            <View style={styles.grid2}>
              <View style={styles.list}>
                {operation.docs.fields.documentRequested.map((e, index) => (
                  <Text key={index} style={styles.textDato}>
                    {e.copias}
                  </Text>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.vSpacer}></View>
          <View style={styles.grid}>
            <Text style={styles.headingTable}>
              INTRUCCIONES EMISIÓN: BILL OF LADING
            </Text>
          </View>
          <View style={styles.vSpacerXs}></View>
          <View style={styles.docsTable}>
            <View style={styles.docsTableRow}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>SHIPPER</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>
                  {fieldsComercial.seller.nombre}
                </Text>
                <Text style={styles.textDato}>
                  {fieldsComercial.seller.direccion}
                </Text>
                <Text style={styles.textDato}>
                  {fieldsComercial.seller.direccion2}
                </Text>
                <Text style={styles.textDato}>
                  {fieldsComercial.seller.country}
                </Text>
                <Text style={styles.textDato}>
                  {fieldsComercial.seller.taxId}
                </Text>
                <Text style={styles.mercaderiaText}>
                  {fieldsDocs.comentariosSeller}
                </Text>
              </View>
            </View>
            <View style={styles.docsTableRow}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>CONSIGNEE</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consignee.nombre}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consignee.direccion}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consignee.direccion2}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consignee.direccion3}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consignee.taxId}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consignee.country}
                </Text>
                <Text style={styles.textDato}>
                  {fieldsDocs.comentariosConsignee}
                </Text>
              </View>
            </View>
            <View style={styles.docsTableRow}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>NOTIFY</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>
                  {operation.docs.fields.notify.nombre}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.notify.direccion}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.notify.direccion2}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.notify.direccion3}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.notify.taxId}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.notify.country}
                </Text>
                <Text style={styles.textDato}>
                  {fieldsDocs.comentariosNotify}
                </Text>
              </View>
            </View>
            <View style={styles.docsTableRow}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>LUGAR DE EMISIÓN</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>{fieldsDocs.placeBLIssue}</Text>
              </View>
            </View>
            <View style={styles.docsTableRow}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>PUERTO DE DESTINO</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>
                  {fieldsComercial.destinationPort}
                </Text>
              </View>
            </View>
            <View style={styles.docsTableRow}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>TIPO CONTENEDOR</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>{fieldsDocs.tipoContenedor}</Text>
              </View>
            </View>
            <View style={styles.docsTableRow}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>TEMPERATURA</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>{fieldsDocs.temperature}</Text>
              </View>
            </View>
            <View style={styles.docsTableRow}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>TERMINOS DE FLETE</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>{fieldsDocs.terminosFlete}</Text>
              </View>
            </View>
            <View style={styles.docsTableRowMercaderia}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>DESCRIPCIÓN MERCADERÍA</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>{descriptionOfGoods}</Text>
              </View>
            </View>
          </View>
          <View style={styles.vSpacer}></View>
          <View style={styles.grid}>
            <Text style={styles.headingTable}>
              INTRUCCIONES EMISIÓN: RESTO DE LOS DOCS
            </Text>
          </View>
          <View style={styles.vSpacerXs}></View>
          <View style={styles.docsTable}>
            <View style={styles.docsTableRow}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>CONSIGNEE</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consigneeRest.nombre}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consigneeRest.direccion}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consigneeRest.direccion2}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consigneeRest.direccion3}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consigneeRest.taxId}
                </Text>
                <Text style={styles.textDato}>
                  {operation.docs.fields.consigneeRest.country}
                </Text>
                <Text style={styles.textDato}>
                  {fieldsDocs.comentariosConsigneeRest}
                </Text>
              </View>
            </View>
            <View style={styles.docsTableRowMercaderia}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>DESCRIPCIÓN MERCADERÍA</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>{descriptionOfGoods2}</Text>
              </View>
            </View>
          </View>
          <View style={styles.vSpacer}></View>
          <View style={styles.grid}>
            <Text style={styles.headingTable}>
              INTRUCCIONES EMISIÓN: FACTURA COMERCIAL
            </Text>
          </View>
          <View style={styles.vSpacerXs}></View>
          <View style={styles.docsTable}>
            <View style={styles.docsTableRow}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>CONSIGNEE</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <View style={styles.tableDocsRight}>
                  <Text style={styles.textDato}>
                    {operation.comercial.fields.empresa.nombre}
                  </Text>
                  <Text style={styles.textDato}>
                    {operation.comercial.fields.empresa.direccion}
                  </Text>
                  <Text style={styles.textDato}>
                    {operation.comercial.fields.empresa.direccion2}
                  </Text>
                  <Text style={styles.textDato}>
                    TAX ID: {operation.comercial.fields.empresa.vatNumber}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.docsTableRowMercaderia}>
              <View style={styles.tableDocsLeft}>
                <Text style={styles.negrita}>DESCRIPCIÓN MERCADERÍA</Text>
              </View>
              <View style={styles.tableDocsRight}>
                <Text style={styles.textDato}>{descriptionOfGoods2}</Text>
              </View>
            </View>
          </View>
          <View style={styles.vSpacer}></View>
          <View style={styles.grid}>
            <Text style={styles.headingTable}>INSTRUCCIONES ESPECIALES:</Text>
          </View>
          <View style={styles.vSpacerXs}></View>
          <Text style={styles.textDato}>
            {operation.docs.fields.comentarios}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
