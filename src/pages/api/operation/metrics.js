import OperationModel from "@/models/operation";
import authMiddleware from "@/libs/auth";
import {
  calculateAnticipo,
  calculateTotal,
  calculateBalance,
} from "@/components/controllers/financiera";
import { transformDateExcel } from "@/utils/functions";
const keys = [
      "Ref Number",
      "Date",
      "Status",
      "Empresa (Duplo/DPL)",
      "Shipper",
      "Buyer",
      "Buyer Ref",
      "Consignee (Resto de los Docs)",
      "Net Weight",
      "Net Weight",
      "Family",
      "Family 2",
      "Prodcuct Description",
      "Incoterm Buy",
      "Terminos de Pago Buy",
      "Precio Buy",
      "Monto Buy",
      "Incoterm Sell",
      "Terminos de Pago Sell",
      "Precio Venta",
      "Monto Venta",
      "Precio Marketing",
      "Monto Marketing",
      "Monto Broker",
      "Shipment From",
      "Shipment To",
      "Destino",
      "Container Number",
      "Fecha ETD",
      "Fecha ETA",
      "Freight Forwarder",
      "Shipping Line",
      "Nro Factura Flete Int.",
      "Monto Factura Flete Int.",
      "Fecha de Pago Flete Int.",
      "Nro Factura Frigorifico",
      "Monto Factura Frigorífico",
      "Monto Pago Anticipo",
      "Fecha Pago Anticipo",
      "Monto Pago Balance",
      "Fecha Pago Balance",
      "Nro Factura (Duplo/DPL)",
      "Monto Factura",
      "Monto Cobro Anticipo",
      "Fecha Cobro Anticipo",
      "Monto Cobro Balance",
      "Fecha Cobro Balance",
      "Nro. Factura Marketing",
      "Monto Factura Marketing",
      "Fecha de Pago Marketing",
      "Profit",
      "Tipo de Operacion (Trading / Trading+Mkt / Broker)",
    ]

async function handler(req, res) {
    try {
        const objetos = await OperationModel.find({});
        const operations = objetos.map((operation) => {
            const { productos, operationType } = operation.comercial.fields; 
            let netWeight2 = 0;
            const montoCobradoAnticipo =
              calculateAnticipo(
                operation.contableFinanciera.fields.montoAnticipoSale,
                operation.comercial.fields.paymentTermsSale,
                operation.comercial.fields.totalSale
              ) || 0;
            const montoFacturaPurchase =  calculateTotal(
              operation.contableFinanciera.fields.totalFacturaCompra,
              operation.comercial.fields.productos,
              "unitPricePurchase"
            ) || 0;
            const montoFacturaSell =
              calculateTotal(
                operation.contableFinanciera.fields.totalFacturaVenta,
                operation.comercial.fields.productos,
                "unitPriceSale"
              ) || 0;
            const montoPagadoAnticipo =
              calculateAnticipo(
                operation.contableFinanciera.fields.montoAnticipoPurchase,
                operation.comercial.fields.paymentTermsPurchase,
                operation.comercial.fields.totalPurchase
              ) || 0;
            const montoPagadoBalance = calculateBalance(
              montoPagadoAnticipo,
              montoFacturaPurchase,
              operation.contableFinanciera.fields.montoBalancePurchase
            );
            let montoFacturaMarketing = 0
            let montoMarketingComercial = 0;
            let montoBroker = 0;
            productos.forEach((product) => {
              const { netWeightLogistica, netWeight, comisionMarketing, comisionPurchase } = product;
              if(operationType === "Trading + Marketing"){
                montoMarketingComercial += comisionMarketing * (netWeight);
                montoFacturaMarketing += comisionMarketing * (netWeightLogistica || netWeight);
              }
              if(operationType === "Broker"){
                montoBroker += comisionPurchase * (netWeightLogistica || netWeight);
              }
              netWeight2 += netWeightLogistica;
            })
            return [
              operation.id,
              transformDateExcel(operation.comercial.fields.date),
              operation.status,
              operation.comercial.fields.empresa.nombre,
              operation.comercial.fields?.seller?.nombre,
              operation.comercial.fields?.buyer?.nombre,
              operation.comercial.fields?.buyer?.refNumber,
              operation.docs.fields?.consignee?.nombre,
              operation.comercial.fields.totalNetWeight,
              netWeight2,
              operation.comercial.fields.productos[0].family,
              operation.comercial.fields.productos[0].famili2,
              operation.comercial.fields.productos[0].description,
              operation.comercial.fields.deliveryTermsPurchase,
              operation.comercial.fields.paymentTermsPurchase,
              operation.comercial.fields.productos[0].unitPricePurchase,
              operation.comercial.fields.totalPurchase,
              operation.comercial.fields.deliveryTermsSale,
              operation.comercial.fields.paymentTermsSale,
              operation.comercial.fields.productos[0].unitPriceSale,
              operation.comercial.fields.totalSale,
              operation.comercial.fields.comisionMarketing,
              montoMarketingComercial || 0,
              montoBroker || 0,
              transformDateExcel(operation.comercial.fields.shipmentPeriodFrom),
              transformDateExcel(operation.comercial.fields.shipmentPeriodTo),
              operation.comercial.fields.destinationCountry,
              operation.logistica.fields.containerNr,
              transformDateExcel(operation.logistica.fields.etd),
              transformDateExcel(operation.logistica.fields.eta),
              operation.logistica.fields.freightForwarder,
              operation.logistica.fields.ShippingLine,
              operation.contableFinanciera.fields.nroFacturaFlete,
              operation.contableFinanciera.fields.montoFacturaFlete ||
                operation.logistica.fields.freightAmount ||
                0,
              transformDateExcel(operation.contableFinanciera.fields.fechaPagoFlete),
              operation.contableFinanciera.fields.nroFacturaProveedorFrigo,
              calculateTotal(
                operation.contableFinanciera.fields.totalFacturaCompra,
                operation.comercial.fields.productos,
                "unitPricePurchase"
              ) || 0,
              montoPagadoAnticipo,
              transformDateExcel(
                operation.contableFinanciera.fields.fechaAnticipoPurchase
              ),
              montoPagadoBalance,
              transformDateExcel(
                operation.contableFinanciera.fields.fechaBalancePurchase
              ),
              operation.contableFinanciera.fields.nroFacturaSell,
              montoFacturaSell,
              montoCobradoAnticipo,
              transformDateExcel(
                operation.contableFinanciera.fields.fechaCobroAnticipo
              ),
              calculateBalance(
                montoCobradoAnticipo,
                montoFacturaSell,
                operation.contableFinanciera.fields.montoBalanceSale
              ),
              transformDateExcel(
                operation.contableFinanciera.fields.fechaCobroBalance
              ),
              operation.contableFinanciera.fields.nroFacturaMarketing,
              operation.contableFinanciera.fields.montoFacturaMarketing || montoFacturaMarketing,
              transformDateExcel(
                operation.contableFinanciera.fields.fechaPagoMarketing
              ),
              operation.contableFinanciera.fields.profitNeto,
              operation.comercial.fields.operationType,
            ];
          })
        res.json([keys,...operations]);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
      }
}

export default authMiddleware(handler);
