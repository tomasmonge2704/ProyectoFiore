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
  Flex,
  Text,
  Heading,
  Table,
  IconButton,
Thead,
Tr,
Th,
Tbody,
Td,
Avatar
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import { useState } from "react";
export default function Home() {
  const [display, changeDisplay] = useState('hide')
    const [value, changeValue] = useState(1)
  return (
    <>
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
        <GridItem colSpan={2}>
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
      </Grid>
      <Flex justifyContent="space-between" mt={8}>
                    <Flex align="flex-end">
                        <Heading as="h2" size="lg" letterSpacing="tight">Transactions</Heading>
                    </Flex>
                    <IconButton icon={<FiCalendar />} />
                </Flex>
                <Flex flexDir="column">
                    <Flex overflow="auto">
                        <Table variant="unstyled" mt={4}>
                            <Thead>
                                <Tr color="gray">
                                    <Th>Name of transaction</Th>
                                    <Th>Category</Th>
                                    <Th isNumeric>Cashback</Th>
                                    <Th isNumeric>Amount</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        <Flex align="center">
                                            <Avatar size="sm" mr={2} src="amazon.jpeg" />
                                            <Flex flexDir="column">
                                                <Heading size="sm" letterSpacing="tight">Amazon</Heading>
                                                <Text fontSize="sm" color="gray">Apr 24, 2021 at 1:40pm</Text>
                                            </Flex>
                                        </Flex>
                                    </Td>
                                    <Td>Electronic Devices</Td>
                                    <Td isNumeric>+$2</Td>
                                    <Td isNumeric><Text fontWeight="bold" display="inline-table">-$242</Text>.00</Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <Flex align="center">
                                            <Avatar size="sm" mr={2} src="starbucks.png" />
                                            <Flex flexDir="column">
                                                <Heading size="sm" letterSpacing="tight">Starbucks</Heading>
                                                <Text fontSize="sm" color="gray">Apr 22, 2021 at 2:43pm</Text>
                                            </Flex>
                                        </Flex>
                                    </Td>
                                    <Td>Cafe and restaurant</Td>
                                    <Td isNumeric>+$23</Td>
                                    <Td isNumeric><Text fontWeight="bold" display="inline-table">-$32</Text>.00</Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <Flex align="center">
                                            <Avatar size="sm" mr={2} src="youtube.png" />
                                            <Flex flexDir="column">
                                                <Heading size="sm" letterSpacing="tight">YouTube</Heading>
                                                <Text fontSize="sm" color="gray">Apr 13, 2021 at 11:23am</Text>
                                            </Flex>
                                        </Flex>
                                    </Td>
                                    <Td>Social Media</Td>
                                    <Td isNumeric>+$4</Td>
                                    <Td isNumeric><Text fontWeight="bold" display="inline-table">-$112</Text>.00</Td>
                                </Tr>
                                {display == 'show' &&
                                    <>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" mr={2} src="amazon.jpeg" />
                                                    <Flex flexDir="column">
                                                        <Heading size="sm" letterSpacing="tight">Amazon</Heading>
                                                        <Text fontSize="sm" color="gray">Apr 12, 2021 at 9:40pm</Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td>Electronic Devices</Td>
                                            <Td isNumeric>+$2</Td>
                                            <Td isNumeric><Text fontWeight="bold" display="inline-table">-$242</Text>.00</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" mr={2} src="starbucks.png" />
                                                    <Flex flexDir="column">
                                                        <Heading size="sm" letterSpacing="tight">Starbucks</Heading>
                                                        <Text fontSize="sm" color="gray">Apr 10, 2021 at 2:10pm</Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td>Cafe and restaurant</Td>
                                            <Td isNumeric>+$23</Td>
                                            <Td isNumeric><Text fontWeight="bold" display="inline-table">-$32</Text>.00</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="sm" mr={2} src="youtube.png" />
                                                    <Flex flexDir="column">
                                                        <Heading size="sm" letterSpacing="tight">YouTube</Heading>
                                                        <Text fontSize="sm" color="gray">Apr 7, 2021 at 9:03am</Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td>Social Media</Td>
                                            <Td isNumeric>+$4</Td>
                                            <Td isNumeric><Text fontWeight="bold" display="inline-table">-$112</Text>.00</Td>
                                        </Tr>
                                    </>
                                }
                            </Tbody>
                        </Table>
                    </Flex>
                    </Flex>
    </>
  );
}
