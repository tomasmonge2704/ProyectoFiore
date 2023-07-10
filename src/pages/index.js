import Layout from "@/components/Layouts/main";
import {
  Grid,
  GridItem,
  Stat,
  StatGroup,
  StatHelpText,
  StatNumber,
  StatLabel,
  StatArrow,
  Card,
  CardBody,
} from "@chakra-ui/react";
export default function Home() {
  return (
    <Layout title="Dashboard">
      <Grid
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem w='100%'>
          <Card>
            <CardBody>
              <StatGroup>
                <Stat>
                  <StatLabel>Sent</StatLabel>
                  <StatNumber>345,670</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Clicked</StatLabel>
                  <StatNumber>45</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={4} bg="tomato" />
      </Grid>
    </Layout>
  );
}
