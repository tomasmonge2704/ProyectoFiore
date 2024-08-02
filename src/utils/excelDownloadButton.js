import { IconButton } from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import React from "react";
import * as ExcelJS from "exceljs";
import useFetch from "@/hooks/useFetch";

const convertDateStringsToDates = (row) => {
  // Aquí puedes especificar los índices de las columnas que contienen fechas.
  const dateIndices = [1, 24, 25, 28, 29, 34, 38, 40, 44, 49];
  return row.map((cell, index) => {
    if (dateIndices.includes(index) && typeof cell === 'string') {
      // Intenta convertir la cadena de fecha en un objeto Date.
      const date = new Date(cell);
      // Verifica si la conversión fue exitosa.
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return cell;
  });
};

const generateExcelFile = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  // Agregar datos al archivo Excel, convirtiendo fechas a objetos Date
  data.forEach((row) => {
    const convertedRow = convertDateStringsToDates(row);
    worksheet.addRow(convertedRow);
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
      isLoading={!dataExcel}
      onClick={() => generateExcelFile(dataExcel)}
    />
  );
};
