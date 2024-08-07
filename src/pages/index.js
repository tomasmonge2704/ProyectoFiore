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
  Box,
  Image,
  useToast,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  TableContainer,
  Skeleton,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import useFetch from "@/hooks/useFetch";
import { StateSelector } from "@/utils/stateSelector";
import { handleOrderBy } from "@/utils/functions";
import { SearchIcon } from "@chakra-ui/icons";
import { ConfirmDuplicate } from "@/utils/confirmDuplicate";
import { MultipleSelector } from "@/utils/selectMultiple";
import { ExcelIconButton } from "@/utils/excelDownloadButton";
export default function Dashboard() {
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    if (operations) {
      setItemsToDisplay(
        operations.filter((element) =>
          Object.values(element).some(
            (param) =>
              typeof param === "string" &&
              param.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      );
    }
  }, [searchText]);
  const [slice, setSlice] = useState({ start: 0, end: 10 });
  const handlePrev = () => {
    setSlice({ start: slice.start - 10, end: slice.start });
  };
  const handleNext = () => {
    setSlice({ start: slice.end, end: slice.end + 10 });
  };
  const [operations, setOperations] = useFetch(
    `${process.env.API_URL}/operation/listado`,
    undefined
  );
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  useEffect(() => {
    if (operations) {
      setItemsToDisplay(operations);
      setIsloading(false);
    }
  }, [operations]);
  const toast = useToast();
  const options = [
    {
      label: "New",
      value: "New",
      colorScheme: "purple",
    },
    {
      label: "Pending Shipment",
      value: "Pending Shipment",
      colorScheme: "blue",
    },
    {
      label: "Draft",
      value: "Draft",
      colorScheme: "yellow",
    },
    {
      label: "Originals",
      value: "Originals",
      colorScheme: "orange",
    },
    {
      label: "Finished",
      value: "Finished",
      colorScheme: "green",
    },
    {
      label: "Canceled",
      value: "Canceled",
      colorScheme: "red",
    },
  ];
  const [selectedStatus, setSelectedStatus] = useState([]);
  const skeletonRows = 8;
  useEffect(() => {
    setIsloading(true);
    handleOrderBy(filter, setFilter, setOperations, selectedStatus);
  }, [filter,selectedStatus]);
  return (
    <Box shadow="lg" borderRadius={10}>
      <Flex w="full" justifyContent="space-between" p={5}>
        <MultipleSelector
                    options={options}
                    defaultValue={selectedStatus}
                    set={setSelectedStatus}
                  />
        <InputGroup w="30%">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            variant="filled"
            placeholder="Buscar..."
            borderRadius="full"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </InputGroup>
        <ExcelIconButton data={operations} />
      </Flex>
      <Box w="full" overflowX="auto">
        <TableContainer w="full" h="75vh">
          <Table variant="striped" size="sm">
            <Thead>
              <Tr color="gray">
                <Th
                  onClick={() => setFilter("refNumber")}
                  color={filter == "refNumber" && "orange"}
                >
                  Ref Number
                  {filter == "refNumber" ? (
                    <ArrowDownIcon boxSize={5} ml={2} />
                  ) : (
                    <ArrowUpIcon boxSize={5} ml={2} />
                  )}
                </Th>
                <Th w="15vw">
                  
                </Th>
                <Th
                  onClick={() => setFilter("shipper")}
                  color={filter == "shipper" && "orange"}
                >
                  Shipper
                  {filter == "shipper" ? (
                    <ArrowDownIcon boxSize={5} ml={2} />
                  ) : (
                    <ArrowUpIcon boxSize={5} ml={2} />
                  )}
                </Th>
                <Th
                  onClick={() => setFilter("buyer")}

                  color={filter == "buyer" && "orange"}
                >
                  Buyer
                  {filter == "buyer" ? (
                    <ArrowDownIcon boxSize={5} ml={2} />
                  ) : (
                    <ArrowUpIcon boxSize={5} ml={2} />
                  )}
                </Th>
                <Th>Buyer Ref.</Th>
                <Th>Paid</Th>
                <Th>Collection</Th>
                <Th
                  onClick={() => setFilter("timeToArrival")}
                  color={filter == "timeToArrival" && "orange"}
                >
                  Time to arrival
                  {filter == "timeToArrival" ? (
                    <ArrowDownIcon boxSize={5} ml={2} />
                  ) : (
                    <ArrowUpIcon boxSize={5} ml={2} />
                  )}
                </Th>
                <Th
                  onClick={() =>
                    handleOrderBy("date", setFilter, setOperations)
                  }
                >
                  <IconButton icon={<FiCalendar />} />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {!isLoading && itemsToDisplay.length ? (
                itemsToDisplay.slice(slice.start, slice.end).map((e, index) => (
                  <Tr
                    key={index}
                    borderLeft="5px solid transparent"
                    _hover={{ shadow: "md", borderColor: "orange" }}
                  >
                    <Td w="20%">
                      <Link href={"/operation/" + e.refNumber}>
                        <Flex align="center" justifyContent="flex-start">
                          {e.empresa && (
                            <Image
                              mr={2}
                              w="20"
                              objectFit="cover"
                              src={
                                e.empresa == "Duplo"
                                  ? "Logo-Duplo.png"
                                  : "Logo-DPL.png"
                              }
                              alt={e.refNumber}
                            />
                          )}
                          <Flex flexDir="column">
                            <Text as="b" fontSize="lg" letterSpacing="tight">
                              {e.refNumber}
                            </Text>
                            <Text fontSize="sm" color="gray">
                              {e.empleado}
                            </Text>
                          </Flex>
                        </Flex>
                      </Link>
                    </Td>
                    <Td>
                      <StateSelector
                        selected={e.status}
                        refNumber={e.refNumber}
                      />
                    </Td>
                    <Td>{e.shipper && e.shipper}</Td>
                    <Td>{e.buyer && e.buyer}</Td>
                    <Td>{e.buyerRef && e.buyerRef}</Td>
                    <Td>{e.pay && e.pay}</Td>
                    <Td>{e.charged && e.charged}</Td>
                    <Td>{e.timeToArrival && e.timeToArrival}</Td>
                    <Td>
                      <ConfirmDuplicate
                        refNumber={e.refNumber}
                        operations={operations}
                        setOperations={setOperations}
                        toast={toast}
                      />
                    </Td>
                  </Tr>
                ))
              ) : (
                <>
                  {[...Array(skeletonRows)].map((_, index) => (
                    <Tr
                    key={index}
                      borderLeft="5px solid transparent"
                      _hover={{ shadow: "md", borderColor: "orange" }}
                    >
                      <Td w="20%">
                        <Skeleton h={10} />
                      </Td>
                      <Td w="20%">
                        <Skeleton h={10} />
                      </Td>
                      <Td>
                        <Skeleton h={10} />
                      </Td>
                      <Td>
                        <Skeleton h={10} />
                      </Td>
                      <Td>
                        <Skeleton h={10} />
                      </Td>
                      <Td>
                        <Skeleton h={10} />
                      </Td>
                      <Td>
                        <Skeleton h={10} />
                      </Td>
                      <Td>
                        <Skeleton h={10} />
                      </Td>
                      <Td>
                        <Skeleton h={10} />
                      </Td>
                    </Tr>
                  ))}
                </>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Flex
        w="full"
        justifyContent="space-between"
        flexWrap="wrap"
        mt={5}
        p={5}
      >
        <Text>
          Showing {slice.start} to {slice.end} of {itemsToDisplay.length}{" "}
          results
        </Text>
        <Flex justifyContent="space-between" w="44">
          <Button onClick={handlePrev} isDisabled={slice.start == 0 && true}>
            Previous
          </Button>
          <Button
            onClick={handleNext}
            isDisabled={slice.end + 1 > itemsToDisplay.length && true}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
