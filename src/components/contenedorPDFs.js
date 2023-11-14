import { Box } from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";

export default function ContenedoPDFs({ children }) {
  return (
    <Box h="100%">
      <div style={{ marginTop: "20px" }}>
        <PDFViewer style={{ width: "100%", height: "70vh" }}>
          {children}
        </PDFViewer>
      </div>
    </Box>
  );
}
