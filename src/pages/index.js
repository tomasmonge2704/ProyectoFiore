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
  Badge,
  Center,
  Image,
  useToast
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { FiCalendar, FiChevronDown, FiChevronUp } from "react-icons/fi";
import MyChart from "../components/MyChart";
import { Loadder } from "@/utils/loadder";
import useFetch from "@/hooks/useFetch";
export default function Dashboard() {
  const [displayMode, setDisplayMode] = useState("reduced");
  const [operations, setOperations] = useState([]);
  const toast = useToast();
  const [ListOperations] = useFetch(
    `${process.env.API_URL}/operation/listado`,
    undefined
  );
  useEffect(() => {
    if(ListOperations) setOperations(ListOperations);
  },[ListOperations])
  const displayedOperations =
    displayMode === "reduced" && operations
      ? operations.slice(0, 5)
      : operations;
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/operation/by-ref/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Cliente",
          description: `Se ha borrado correctamente.`,
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        const filtered = operations.filter((e) => e.refNumber !== id);
        setOperations(filtered);
      });
  };
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
            {operations ? (
              <Table variant="unstyled">
                <Thead>
                  <Tr color="gray">
                    <Th>Ref Number</Th>
                    <Th>Status</Th>
                    <Th>Shipper</Th>
                    <Th>Buyer</Th>
                    <Th>Pay</Th>
                    <Th>Charged</Th>
                    <Th>Time to arrival</Th>
                    <Th>
                      <IconButton icon={<FiCalendar />} />
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {displayedOperations.map((e, index) => (
                    <Tr key={index}>
                      <Td>
                        <Link href={"/operation/" + e.refNumber}>
                          <Flex align="center" justifyContent="center">
                            {e.empresa &&
                            <Image
                            mr={2}
                            maxW={20}
                            src={
                              e.empresa == "Duplo"
                                ? "logo-Duplo.png"
                                : "Logo-DPL.png"
                            }
                            alt={e.refNumber}
                          />}
                            
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
                        <Badge ml="1" fontSize="1em" colorScheme={e.state == "new" ? "green" : "blue"}>
                          {e.state}
                        </Badge>
                      </Td>
                      <Td>{e.shipper ? e.shipper : <Text>Empty</Text>}</Td>
                      <Td>{e.buyer ? e.buyer : <Text>Empty</Text>}</Td>
                      <Td>{e.pay ? e.pay : <Text>Empty</Text>}</Td>
                      <Td>{e.charged ? e.charged : <Text>Empty</Text>}</Td>
                      <Td>
                        {e.timeToArrival ? e.timeToArrival : <Text>Empty</Text>}
                      </Td>
                      <Td>
                        <IconButton
                          colorScheme="red"
                          variant="solid"
                          icon={<DeleteIcon />}
                          aria-label="Delete"
                          onClick={() => handleDelete(e.refNumber)}
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
          <Flex align="center">
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
          </Flex>
          <Text color="gray" fontSize="sm">
            My Balance
          </Text>
          <Text fontWeight="bold" fontSize="2xl">
            $5,750.20
          </Text>
          <MyChart />
        </Flex>
      </Flex>
    </Flex>
  );
}
