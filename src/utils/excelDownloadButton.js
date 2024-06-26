import { IconButton } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import * as ExcelJS from "exceljs";
import useFetch from "@/hooks/useFetch";
import {
  calculateAnticipo,
  calculateTotal,
  calculateBalance,
} from "@/components/controllers/financiera";
import { transformDateExcel } from "./functions";
const generateExcelFile = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  // Agregar datos al archivo Excel
  data.forEach((row) => {
    worksheet.addRow(row);
  });
  // Establecer el formato de fecha para las columnas que contienen fechas
  const dateColumns = ["B","Y","Z","AC","AD", "AI", "AM", "AO", "AS", "AX"];
  dateColumns.forEach((column) => {
    worksheet.getColumn(column).numFmt = "dd/mm/yyyy";
  });
  // Crear un blob que contiene el archivo Excel
  const blob = await workbook.xlsx.writeBuffer();

  // Crear un objeto URL para el blob
  const blobUrl = URL.createObjectURL(new Blob([blob]));

  // Crear un enlace para descargar el archivo
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "metricas.xlsx";

  // Simular un clic en el enlace para iniciar la descarga
  a.click();

  // Liberar el objeto URL
  URL.revokeObjectURL(blobUrl);
};

export const ExcelIconButton = () => {
  const [operations] = useFetch(`${process.env.API_URL}/operation`, undefined);

  const labels = [
    [
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
    ],
  ];

  const [dataExcel, setDataExcel] = useState([]);
  useEffect(() => {
    if (operations && operations.length > 0) {
      const newDataExcel = [
        ...labels,
        ...operations.map((operation) => {
          const { productos, operationType } = operation.comercial.fields; 
          const montoCobradoAnticipo =
            calculateAnticipo(
              operation.contableFinanciera.fields.montoAnticipoSale,
              operation.comercial.fields.paymentTermsSale,
              operation.comercial.fields.totalSale
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
          let montoMarketing = 0;
          let montoBroker = 0;
          productos.forEach((product) => {
            const { netWeightLogistica, netWeight, comisionMarketing, comisionPurchase } = product;
            if(operationType === "Trading + Marketing"){
              montoMarketing += comisionMarketing * (netWeightLogistica || netWeight);
            }
            if(operationType === "Broker"){
              montoBroker += comisionPurchase * (netWeightLogistica || netWeight);
            }
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
            operation.comercial.fields.totalNetWeightLogistica,
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
            montoMarketing || 0,
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
            calculateAnticipo(
              operation.contableFinanciera.fields.montoAnticipoPurchase,
              operation.comercial.fields.paymentTermsPurchase,
              operation.comercial.fields.totalPurchase
            ) || 0,
            transformDateExcel(
              operation.contableFinanciera.fields.fechaAnticipoPurchase
            ),
            montoPagadoAnticipo,
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
            operation.contableFinanciera.fields.montoFacturaMarketing ||
              operation.logistica.fields.totalMarketing ||
              0,
            transformDateExcel(
              operation.contableFinanciera.fields.fechaPagoMarketing
            ),
            operation.contableFinanciera.fields.profitNeto,
            operation.comercial.fields.operationType,
          ];
        }),
      ];
      setDataExcel(newDataExcel);
    }
  }, [operations]);

  return (
    <IconButton
      icon={<FiDownload />}
      onClick={() => generateExcelFile(dataExcel)}
    />
  );
};
