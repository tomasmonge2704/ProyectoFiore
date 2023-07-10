import Layout from "@/components/Layouts/main";
import { Grid, GridItem } from "@chakra-ui/react";
export default function Home() {
  return (
    <Layout title="Factura">
     <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        <GridItem w='100%' h='10' bg='blue.500'>

        </GridItem>
        <GridItem w='100%' h='10' bg='blue.500'>
            
        </GridItem>
        </Grid>
    </Layout>
  );
}
