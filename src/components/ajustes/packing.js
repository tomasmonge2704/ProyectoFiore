import {
    Table,
    TableContainer,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    IconButton,
    Input,
    Card,
    CardBody
  } from "@chakra-ui/react";
  import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
export const AjustesPacking = ({ CarteraPacking }) => {
    const handleNewRow = (id) => {
        const updatedProductos = [...productos, { id: id, amount: 0 }];
        setProductos(updatedProductos);
      };
      const handleDeleteRow = (id) => {
        const updatedProductos = productos.filter((e) => e.id !== id);
        setProductos(updatedProductos);
      };
      const handleChangeInput = (event, id, parameter) => {
        const updatedProductos = productos.map((producto) => {
          if (producto.id === id) {
            return { ...producto, [parameter]: event.target.value };
          }
          return producto;
        });
        setProductos(updatedProductos);
      };
    
      return (
        <Card w="100%" mt={10} variant="elevated"><CardBody>
        <TableContainer w="100%">
          <Table variant="striped" colorScheme="orange">
            <Thead>
              <Tr>
                <Th>NAME</Th>
                <Th>ACTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {CarteraPacking.length > 0 &&
                CarteraPacking.map((e, index) => (
                  <Tr key={index}>
                    <Td>
                      <Input
                        variant="filled"
                        value={e ? e : ""}
                        onChange={(event) =>
                          handleChangeInput(event, e.id, "quantity")
                        }
                      />
                    </Td>
                    <Td>
                      <IconButton
                        icon={index < 1 ? <PlusSquareIcon /> : <DeleteIcon />}
                        onClick={
                          index > 0
                            ? () => handleDeleteRow(e.id)
                            : () => handleNewRow(Math.random())
                        }
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        </CardBody></Card>
      );
    };
    
