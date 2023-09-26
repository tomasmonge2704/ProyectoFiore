import { StyleSheet } from "@react-pdf/renderer";
import { color } from "framer-motion";
export const styles = StyleSheet.create({
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
      fontWeight: "ultrabold",
    },
    textDato: {
      fontSize: 7,
    },
    line: {
      backgroundColor: "grey",
      height: 2,
      marginBottom: 2,
    },
    footer: {
      color: "grey",
      textAlign: "center",
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
      margin: 0,
      width: "100%",
      textAlign: "center",
      verticalAlign: "middle",
      borderWidth: 1,
      paddingTop: 5,
      paddingBottom: 5,
      borderColor: "black",
      backgroundColor: "rgb(210, 214, 213)",
    },
    borderTableTitle: {
      margin: 0,
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
    firma: {
      marginLeft: "75%",
      height: "90px",
      width: "100px",
    },
    headingTable:{
        backgroundColor: "grey",
        padding:"2px",
        color:"#FFFF",
        fontSize: 10
    },
    docsTable:{
        borderWidth:"1px",
        borderColor:"black",
        width:"100%"
    },
    docsTableRow:{
        borderWidth:"1px",
        borderColor:"black",
        width:"100%",
        display:"flex",
        flexDirection:"row"
    },
    docsTableRowMercaderia:{
      borderWidth:"1px",
      borderColor:"black",
      width:"100%",
      display:"flex",
      flexDirection:"row",
      backgroundColor:"#feebc8"
  },
  mercaderiaText:{
    fontSize: 10,
    fontWeight: "ultrabold",
    color:"#0987A0"
  },
    tableDocsLeft:{
        width:"120px",
        borderRightWidth:"1px",
        borderColor:"black",
        textAlign:"center",
        padding:"2%"
    },
    tableDocsRight:{
        padding:"1%"
    }
  });