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
export const AjustesProductos = ({ CarteraProducts }) => {
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
                <Th>FAMILY</Th>
                <Th>FAMILY 2</Th>
                <Th w="40%">DESCRIPCION</Th>
                <Th>ACTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {CarteraProducts.length &&
                CarteraProducts.map((e, index) => (
                  <Tr key={index}>
                    <Td>
                      <Input
                        variant="filled"
                        value={e.family ? e.family : ""}
                        onChange={(event) =>
                          handleChangeInput(event, e.id, "quantity")
                        }
                      />
                    </Td>
                    <Td>
                      <Input
                        variant="filled"
                        defaultValue={e.famili2 && e.famili2}
                        onChange={(event) =>
                          handleChangeInput(event, e.id, "packing")
                        }
                      />
                    </Td>
                    <Td>
                      <Input
                        variant="filled"
                        defaultValue={e.description && e.description}
                        onChange={(event) =>
                          handleChangeInput(event, e.id, "packing")
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
    