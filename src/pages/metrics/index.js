import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useToast,
  TableContainer,
  Skeleton,
} from "@chakra-ui/react";
import useFetch from "@/hooks/useFetch";
export default function Dashboard() {
  const [isLoading, setIsloading] = useState(true);

  const [metrics] = useFetch(
    `${process.env.API_URL}/operation/metrics`,
    undefined
  );
  useEffect(() => {
    if (metrics) {
      setIsloading(false);
    }
  }, [metrics]);
  const toast = useToast();
  const skeletonRows = 8;
  return (
    <Box shadow="lg" borderRadius={10}>
      <Box w="full" overflowX="auto">
        <TableContainer w="full">
          <Table variant="striped" size="sm">
            <Thead>
              <Tr color="gray">
                {metrics?.length && metrics[0].map((key,index) => (
                    <Th
                    key={index}
                >
                 {key}
                </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {!isLoading && metrics.length ? (
                metrics.slice(1).map((e, index) => (
                  <Tr
                    key={index}
                    borderLeft="5px solid transparent"
                    _hover={{ shadow: "md", borderColor: "orange" }}
                  >
                        {e.map((metric,index) => (
                            <Td key={index}>{metric?.length > 15
                                ? `${metric.slice(0, 15)}...`
                                : metric}</Td>
                        ))

                    }
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
    </Box>
  );
}
