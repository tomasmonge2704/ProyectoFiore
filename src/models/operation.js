import mongoose, { Schema } from "mongoose";

// Subdocumento para los campos comerciales
const fieldsComercialSchema = new Schema({
  orderNumber: String,
  supplierRefNumber: String,
  empresaRefNumber: String,
  empleadoBuyer: String,
  empleadoSeller: String,
  date: String,
  empresa: {
    nombre: String,
    empresa: String,
    direccion: String,
    direccion2: String,
    vatNumber: String,
    bank: {
      beneficiaryBank: String,
      bankAdress: String,
      swiftCode: String,
      beneficiaryName: String,
      beneficiaryAccountNumber: String,
      correspondentBank: String,
      minimo: Number,
      fijo: Number,
      porcentaje: Number,
      minimoCobranza: Number,
      fijoCobranza: Number,
      porcentajeCobranza: Number,
    },
  },
  seller: {
    nombre: String,
    direccion: String,
    direccion2: String,
    pais: String,
    country: String,
    taxId: String,
    refNumber: String,
    plantNumber: String,
    brand: String,
  },
  buyer: {
    nombre: String,
    direccion: String,
    direccion2: String,
    vatNumber: String,
    refNumber: String,
    country: String
  },
  productos: [
    {
      id: String,
      description: String,
      family: String,
      famili2: String,
      packing: String,
      quantity: Number,
      quantityCartons: Number,
      unitPricePurchase: Number,
      unitPriceSale: Number,
      amountSale: Number,
      amountPurchase: Number,
      netWeight: Number,
      netWeightLogistica:Number,
      grossWeight: Number,
      comisionPurchase:Number,
      comisionMarketing:Number
    },
  ],
  totalPurchase: Number,
  totalSale: Number,
  totalNetWeight: Number,
  totalNetWeightLogistica:Number,
  totalQuantityCartons: Number,
  totalGrossWeight: Number,
  productionDate: String,
  operationType: String,
  comisionMarketing: Number,
  comisionPurchase: Number,
  comisionSale: Number,
  shelfLife: String,
  destinationPort: String,
  destinationCountry: String,
  quantity: Number,
  shipmentPeriod: String,
  shipmentPeriodTo: String,
  shipmentPeriodFrom: String,
  deliveryTermsSale: String,
  deliveryTermsPurchase: String,
  paymentTermsSale: String,
  paymentTermsPurchase: String,
  exportTo: String,
  comentarios: String,
});

// Subdocumento para los campos de documentos
const fieldsLogisticaSchema = new Schema({
  ShippingLine: String,
  freightForwarder: String,
  bookingNr: String,
  voyageNr: String,
  insuranceAmount: Number,
  freightAmount: Number,
  eta: String,
  etd: String,
  vesselName: String,
  containerNr: String,
  blNr: String,
  seals: String,
  grossWeight: Number,
  netWeight: Number,
  quantityCartons: Number,
  awbNr: String,
  telexRelease: String,
});
const fieldsDocsSchema = new Schema({
  date: String,
  responsable: String,
  documentRequested: [{ label: String, value: String, copias: String }],
  terminosFlete: String,
  instruccionsToIssue: String,
  tipoContenedor: String,
  descriptionGoods: String,
  descriptionGoods2: String,
  temperature: String,
  placeBLIssue: String,
  comentarios: String,
  comentariosSeller: String,
  comentariosConsignee:String,
  comentariosNotify:String,
  comentariosConsigneeRest:String,
  consignee: {
    nombre: String,
    direccion: String,
    direccion2: String,
    direccion3: String,
    country: String,
    taxId: String,
  },
  notify: {
    nombre: String,
    direccion: String,
    direccion2: String,
    direccion3: String,
    country: String,
    taxId: String,
  },
  consigneeRest: {
    nombre: String,
    direccion: String,
    direccion2: String,
    direccion3: String,
    country: String,
    taxId: String,
  },
});
const fieldsContableFinanciera = new Schema({
  montoAnticipoSale:Number,
  montoAnticipoPurchase:Number,
  montoBalancePurchase:Number,
  montoBalanceSale:Number,
  totalFacturaCompra:Number,
  totalFacturaVenta:Number,
  intermediaryCharges:Number,
  nroFacturaProveedorFrigo:String,
  fechaBalancePurchase:String,
  fechaAnticipoPurchase:String,
  nroFacturaMarketing:String,
  montoFacturaMarketing:Number,
  fechaPagoMarketing:String,
  nroFacturaFlete:String,
  montoFacturaFlete:Number,
  fechaPagoFlete:String,
  nroFacturaSeguro:String,
  montoFacturaSeguro:Number,
  fechaPagoSeguro:String,
  nroFacturaSell:String,
  fechaCobroBalance:String,
  nroFacturaBrokerage:String,
  montoCobradoBrokerage:Number,
  fechaCobroBrokerage:String,
  fechaCobroAnticipo:String,
  comentariosPurchase:String,
  comentariosSell:String,
  comisionMontoPagadoAnticipo:Number,
  comisionMontoPagadobalance:Number,
  comisionMontoPagadoMarketing:Number,
  comisionPagadoFlete:Number,
  comisionPagadoInsurance:Number,
  comisionMontoCobradoAnticipo:Number,
  comisionMontoCobradoBalance:Number,
  comisionMontoCobradoBrokerage:Number,
  profitNeto:Number
});
// Esquema principal
const objetoSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  comercial: {
    title: String,
    completed: Number,
    fields: fieldsComercialSchema,
  },
  docs: {
    title: String,
    completed: Number,
    fields: fieldsDocsSchema,
  },
  logistica: {
    title: String,
    completed: Number,
    fields: fieldsLogisticaSchema,
  },
  contableFinanciera: {
    title: String,
    completed: Number,
    fields: fieldsContableFinanciera,
  },
  status: String,
});

const OperationModel =
  mongoose.models.Operation || mongoose.model("Operation", objetoSchema);
export default OperationModel;
