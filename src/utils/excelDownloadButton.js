import { IconButton } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import * as ExcelJS from "exceljs";
import useFetch from "@/hooks/useFetch";
import { calculateAnticipo } from "@/components/controllers/financiera";
import { transformDate } from "./functions";
const generateExcelFile = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  // Agregar datos al archivo Excel
  data.forEach((row) => {
    worksheet.addRow(row);
  });

  // Crear un blob que contiene el archivo Excel
  const blob = await workbook.xlsx.writeBuffer();

  // Crear un objeto URL para el blob
  const blobUrl = URL.createObjectURL(new Blob([blob]));

  // Crear un enlace para descargar el archivo
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "archivo_excel.xlsx";

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
      "Nro. Factura Marketing",
      "Monto Marketing",
      "Monto Broker",
      "Profit",
      "Destino",
      "Container Number",
      "Fecha ETD",
      "Fecha ETA",
      "Freight Forwarder",
      "Shipping Line",
      "Freight Amount",
      "Shipment From",
      "Shipment To",
      "Monto Pago Anticipo",
      "Fecha Pago Anticipo",
      "Monto Cobro Anticipo",
      "Fecha Cobro Anticipo",
      "Tipo de Operacion (Trading / Trading+Mkt / Broker)",
    ],
  ];

  const [dataExcel, setDataExcel] = useState([]);
  useEffect(() => {
    if (operations && operations.length > 0) {
      const newDataExcel = [
        ...labels,
        ...operations.map((operation) => {
          return [
            operation.id,
            transformDate(operation.comercial.fields.date),
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
            operation.contableFinanciera.fields.nroFacturaMarketing,
            operation.contableFinanciera.fields.montoFacturaMarketing ||
              operation.logistica.fields.totalMarketing,
            operation.comercial.fields.comisionPurchase,
            operation.contableFinanciera.fields.profitNeto,
            operation.comercial.fields.destinationCountry,
            operation.logistica.fields.containerNr,
            transformDate(operation.logistica.fields.etd),
            transformDate(operation.logistica.fields.eta),
            operation.logistica.fields.freightForwarder,
            operation.logistica.fields.ShippingLine,
            operation.logistica.fields.freightAmount,
            transformDate(operation.comercial.fields.shipmentPeriodFrom),
            transformDate(operation.comercial.fields.shipmentPeriodTo),

            calculateAnticipo(
              operation.contableFinanciera.fields.montoAnticipoPurchase,
              operation.comercial.fields.paymentTermsPurchase,
              operation.comercial.fields.totalPurchase
            ) || 0,
            transformDate(
              operation.contableFinanciera.fields.fechaAnticipoPurchase
            ),
            calculateAnticipo(
              operation.contableFinanciera.fields.montoAnticipoSale,
              operation.comercial.fields.paymentTermsSale,
              operation.comercial.fields.totalSale
            ) || 0,
            transformDate(
              operation.contableFinanciera.fields.fechaCobroAnticipo
            ),
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
