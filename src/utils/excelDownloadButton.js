import { IconButton } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import React from "react";
import * as ExcelJS from "exceljs";
import useFetch from "@/hooks/useFetch";
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
  const [dataExcel] = useFetch(`${process.env.API_URL}/operation/metrics`, undefined);
  return (
    <IconButton
      icon={<FiDownload />}
      isLoading={dataExcel ? false : true}
      onClick={() => generateExcelFile(dataExcel)}
    />
  );
};
