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

export default function PdfDocsIntructions({
  operation,
  fieldsComercial,
  fieldsDocs,
}) {
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
          <PDFViewer style={{ width: "100%", height: "70vh" }}>
            <Document title="Docs Instructions.pdf">
              <Page size="A4" style={styles.page}>
                <View style={styles.imageContainer}>
                  <Image
                    src={
                      operation.comercial.fields.empresa.empresa == "DPL"
                        ? "/logo-DPL.png"
                        : "/logo-Duplo.png"
                    }
                  />
                </View>
                <View style={styles.section}>
                  <Text style={styles.title}>
                    INSTRUCCIONES PARA DOCUMENTOS
                  </Text>
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
                  <View style={styles.vSpacer}></View>
                  <View style={styles.grid}>
                    <Text style={styles.negrita}>DOCUMENT REQUESTED:</Text>
                    <View style={styles.list}>
                      {operation.docs.fields.documentRequested.map(
                        (e, index) => (
                          <Text key={index} style={styles.textDato}>
                            {e.label}
                          </Text>
                        )
                      )}
                    </View>
                    <View style={styles.grid2}>
                      <View style={styles.list}>
                        {operation.docs.fields.documentRequested.map(
                          (e, index) => (
                            <Text key={index} style={styles.textDato}>
                              {e.copias}
                            </Text>
                          )
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.grid}>
                  <Text style={styles.headingTable}>INTRUCCIONES EMISIÓN:   BILL OF LADING</Text>
                  </View>
                  <View style={styles.vSpacer}></View>
                  <View style={styles.vSpacer}></View>
                 
                </View>
              </Page>
            </Document>
          </PDFViewer>
        )}
      </div>
    </Box>
  );
}
