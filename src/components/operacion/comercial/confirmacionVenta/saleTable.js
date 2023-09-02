import { View, Text } from "@react-pdf/renderer";
import { convertirAMoneda } from "@/utils/convertInt";
export default function SaleTable({ productos, fields, styles }) {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableTitle}>
          <View style={styles.borderTableTitle}><Text style={styles.negrita}>QUANTITY</Text></View>
          <View style={{width:"150%"}}><View style={styles.borderTableTitle}><Text style={styles.negrita}>PRODUCT</Text></View></View>
          <View style={styles.borderTableTitle}><Text style={styles.negrita}>PACKING</Text></View>
          <View style={styles.borderTableTitle}><Text style={styles.negrita}>UNIT PRICE</Text></View>
          <View style={styles.borderTableTitle}><Text style={styles.negrita}>TOTAL AMOUNT</Text></View>
      </View>
      {productos.length && productos.map((prod,index) => (
        <View style={styles.tableRow} key={index}>
          <View style={styles.borderTable}> <Text style={styles.textDato}>{prod.quantity} MT</Text></View>
          <View style={{width:"150%"}}><View style={styles.borderTable}> <Text style={styles.textDato}>{prod.description}</Text></View></View>
          <View style={styles.borderTable}> <Text style={styles.textDato}>{prod.packing}</Text></View>
          <View style={styles.borderTable}> <Text style={styles.textDato}>USD {prod.unitPriceSale} /MT</Text></View>
          <View style={styles.borderTable}> <Text style={styles.textDato}>USD {convertirAMoneda(prod.unitPriceSale * prod.quantity) || 0}</Text></View>
        </View>
      ))}
      <View style={styles.tableRow}>
          <View style={styles.borderTable}> <Text style={styles.textDato}>{fields.totalWeight !== 0 && fields.totalWeight} MT</Text></View>
          <View style={{width:"150%"}}></View>
          <View style={{width:"100%"}}></View>
          <View style={{width:"100%"}}></View>
          <View style={styles.borderTable}> <Text style={styles.textDato}>USD {convertirAMoneda(fields.totalSale)}</Text></View>
        </View>
    </View>
  );
}
