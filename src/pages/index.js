import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Text,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Center,
  Image,
  useToast
} from "@chakra-ui/react";
import Link from "next/link";
import { FiCalendar, FiChevronDown, FiChevronUp, FiCopy } from "react-icons/fi";
import { Loadder } from "@/utils/loadder";
import useFetch from "@/hooks/useFetch";
import { StateSelector } from "@/utils/stateSelector";
import { handleDuplicateOperation,handleOrderBy } from "@/utils/functions";
export default function Dashboard() {
  const [displayMode, setDisplayMode] = useState("reduced");
  const [operations, setOperations] = useState([]);
  const [filter, setFilter] = useState("");
  const [ListOperations] = useFetch(`${process.env.API_URL}/operation/listado`,undefined);
  useEffect(() => {
    if (ListOperations && !ListOperations.error) setOperations(ListOperations);
  }, [ListOperations]);
  const displayedOperations =
    displayMode === "reduced" && operations
      ? operations.slice(0, 7)
      : operations;

  const toast = useToast();
  return (
    <Flex
      h={[null, "100vh"]}
      maxW="2000px"
      flexDir={["column", "row"]}
      overflow="hidden"
    >
      <Flex
        w={"100%"}
        p="3%"
        flexDir="column"
        className="noScrollBar"
        overflow="auto"
        minH="100vh"
      >
        <Flex justifyContent="space-between">
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              Operations
            </Heading>
          </Flex>
        </Flex>
        <Flex flexDir="column">
          <Flex overflow="auto">
            {ListOperations ? (
              <Table variant="unstyled">
                <Thead>
                  <Tr color="gray">
                    <Th
                      onClick={() => handleOrderBy("refNumber",setFilter,setOperations)}
                      color={filter == "refNumber" && "orange"}
                    >
                      Ref Number
                    </Th>
                    <Th
                    onClick={() => handleOrderBy("status",setFilter,setOperations)}
                    color={filter == "status" && "orange"}
                    >Status</Th>
                    <Th
                      onClick={() => handleOrderBy("shipper",setFilter,setOperations)}
                      color={filter == "shipper" && "orange"}
                    >
                      Shipper
                    </Th>
                    <Th
                      onClick={() => handleOrderBy("buyer",setFilter,setOperations)}
                      color={filter == "buyer" && "orange"}
                    >
                      Buyer
                    </Th>
                    <Th>Paid</Th>
                    <Th>Collection</Th>
                    <Th
                      onClick={() => handleOrderBy("timeToArrival",setFilter,setOperations)}
                      color={filter == "timeToArrival" && "orange"}
                    >
                      Time to arrival
                    </Th>
                    <Th onClick={() => handleOrderBy("date",setFilter,setOperations)}>
                      <IconButton icon={<FiCalendar />} />
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {displayedOperations.map((e, index) => (
                    <Tr key={index}>
                      <Td>
                        <Link href={"/operation/" + e.refNumber}>
                          <Flex align="center" justifyContent="flex-start">
                            {e.empresa && (
                              <Image
                                mr={2}
                                maxW={20}
                                maxH={6}
                                src={
                                  e.empresa == "Duplo"
                                    ? "Logo-Duplo.png"
                                    : "Logo-DPL.png"
                                }
                                alt={e.refNumber}
                              />
                            )}

                            <Flex flexDir="column">
                              <Heading size="sm" letterSpacing="tight">
                                {e.refNumber}
                              </Heading>
                              <Text fontSize="sm" color="gray">
                                {e.empleado}
                              </Text>
                            </Flex>
                          </Flex>
                        </Link>
                      </Td>
                      <Td>
                        <StateSelector selected={e.status} refNumber={e.refNumber} />
                      </Td>
                      <Td>{e.shipper && e.shipper}</Td>
                      <Td>{e.buyer && e.buyer}</Td>
                      <Td>{e.pay && e.pay}</Td>
                      <Td>{e.charged && e.charged}</Td>
                      <Td>{e.timeToArrival && e.timeToArrival}</Td>
                      <Td>
                        <IconButton
                          colorScheme="blue"
                          variant="solid"
                          icon={<FiCopy/>}
                          aria-label="Delete"
                          onClick={() => handleDuplicateOperation(e.refNumber,setOperations,operations,toast)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Center w="100%">
                <Loadder />
              </Center>
            )}
          </Flex>
          {displayedOperations.length > 6 && <Flex align="center">
            <Divider />
            <IconButton
              icon={
                displayMode === "reduced" ? <FiChevronDown /> : <FiChevronUp />
              }
              onClick={() => {
                setDisplayMode(
                  displayMode === "reduced" ? "expanded" : "reduced"
                );
              }}
            />
            <Divider />
          </Flex>}
        </Flex>
      </Flex>
    </Flex>
  );
}
