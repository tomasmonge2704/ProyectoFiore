import { Center, Grid, Text } from "@chakra-ui/react";
export const ErrorMessage = ({ message }) => {
  return (
    <Grid
      textAlign="center"
      alignItems="center"
      minH="10rem"
      border="1px solid"
      borderColor="red"
      m="10%"
      borderRadius="lg"
      borderStyle="dashed"
    >
      <Text as="b" fontSize="xl" color="red">
        Error
      </Text>
      <Text fontSize="lg">{message}</Text>
    </Grid>
  );
};
