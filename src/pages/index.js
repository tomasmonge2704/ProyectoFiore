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
  useToast,
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
  const [filter, setFilter] = useState("");
  const toast = useToast();
  const [ListOperations] = useFetch(
    `${process.env.API_URL}/operation/listado`,
    undefined
  );
  useEffect(() => {
    if (ListOperations) setOperations(ListOperations);
  }, [ListOperations]);
  const displayedOperations =
    displayMode === "reduced" && operations
      ? operations.slice(0, 7)
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
  const handleOrderBy = (param) => {
    const token = localStorage.getItem("token");
    setFilter(param);
    fetch(`${process.env.API_URL}/operation/orderBy/${param}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOperations(data));
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
                    <Th
                      onClick={() => handleOrderBy("refNumber")}
                      color={filter == "refNumber" && "orange"}
                    >
                      Ref Number
                    </Th>
                    <Th>Status</Th>
                    <Th
                      onClick={() => handleOrderBy("shipper")}
                      color={filter == "shipper" && "orange"}
                    >
                      Shipper
                    </Th>
                    <Th
                      onClick={() => handleOrderBy("buyer")}
                      color={filter == "buyer" && "orange"}
                    >
                      Buyer
                    </Th>
                    <Th>Pay</Th>
                    <Th>Charged</Th>
                    <Th
                      onClick={() => handleOrderBy("timeToArrival")}
                      color={filter == "timeToArrival" && "orange"}
                    >
                      Time to arrival
                    </Th>
                    <Th onClick={() => handleOrderBy("date")}>
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
                            {e.empresa && (
                              <Image
                                mr={2}
                                maxW={20}
                                src={
                                  e.empresa == "Duplo"
                                    ? "logo-Duplo.png"
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
                        <Badge
                          ml="1"
                          fontSize="1em"
                          colorScheme={
                            e.state == "new"
                              ? "purple"
                              : e.state == "completed"
                              ? "green"
                              : "blue"
                          }
                        >
                          {e.state}
                        </Badge>
                      </Td>
                      <Td>{e.shipper && e.shipper}</Td>
                      <Td>{e.buyer && e.buyer}</Td>
                      <Td>{e.pay && e.pay}</Td>
                      <Td>{e.charged && e.charged}</Td>
                      <Td>{e.timeToArrival && e.timeToArrival}</Td>
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
        </Flex>
      </Flex>
    </Flex>
  );
}
