import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Flex,
  Td,
  IconButton,
  Tbody,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Pagination from "@choc-ui/paginator";

export const TablePagination = ({ data, params, handleOpenModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const itemsPerPage = 6;
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    if (data) {
      setItemsToDisplay(data.slice(0, itemsPerPage));
      setTotalPages((data.length * 10) / itemsPerPage);
    }
  }, [data]);
  useEffect(() => {
    if (data) setItemsToDisplay(data.slice(startIndex, endIndex));
  }, [currentPage]);

  return (
    <TableContainer w="100%" mt={4}>
      <Table size="lg">
        <Thead>
          <Tr>
            {params.map((e, index) => (
              <Th w={e.label == "DESCRIPCION" && "50%"} key={index}>
                {e.label}
              </Th>
            ))}
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data ? (
            itemsToDisplay.length > 0 &&
            itemsToDisplay.map((e) => (
              <Tr key={e._id} w="full">
                {params.map((param, index) => (
                  <Td key={index}>
                    <Text as="b">{e[param.param]}</Text>
                  </Td>
                ))}
                <Td>
                  <IconButton
                    colorScheme="orange"
                    variant="solid"
                    icon={<EditIcon />}
                    aria-label="save"
                    onClick={() => handleOpenModal(e)}
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <>
              <Tr>
                {params.map((e, index) => (
                  <Td key={index}>
                    <Skeleton h={10} />
                  </Td>
                ))}
                <Td>
                  <Skeleton h={10} />
                </Td>
              </Tr>
              <Tr>
                {params.map((e, index) => (
                  <Td key={index}>
                    <Skeleton h={10} />
                  </Td>
                ))}
                <Td>
                  <Skeleton h={10} />
                </Td>
              </Tr>
            </>
          )}
        </Tbody>
      </Table>
      {itemsToDisplay && (
                <Flex
                  w="full"
                  p={50}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Pagination
                    current={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                    total={totalPages}
                    paginationProps={{
                      display: "flex",
                    }}
                    activeStyles={{
                      bg: "orange.400",
                    }}
                    hoverStyles={{
                      bg: "cyan.300",
                    }}
                  />
                </Flex>
              )}
    </TableContainer>
  );
};
