import {
  Text,
  Skeleton,
  Card,
  Heading,
  CardBody,
  Flex,
  VStack,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { countries } from "./countries";
export const GridCards = ({ data, params,handleOpenModal }) => {
  return (
      <Flex w="full" justify="flex-start" mt={10} wrap="wrap" gap={5}>
        {data == undefined ? (
          <>
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
          </>
        ) : (
          data.map((e, index) => (
            <Card
            w={["9rem","12rem"]}
              key={index}
              shadow="sm"
              variant="filled"
              _hover={{ shadow: "xl", bottom: "1",cursor:"pointer"}}
              onClick={() => handleOpenModal(e)}
            >
              <CardBody>
                <VStack spacing={2} textAlign="center">
                  <Avatar size="lg" name={e[params[0].param]}>
                    {e.emoji && <AvatarBadge boxSize='1.25em' border="0px" bg="transparent" backdropFilter="blur(20px) saturate(1.5)"><span className="emoji">{countries.find((country) => country.value == e.emoji).emoji}</span></AvatarBadge>}
                  </Avatar>
                  <Heading size="sm">{e[params[0].param]}</Heading>
                  {params.slice(1,3).map((param,index) => (
                    <Text as="p" key={index}>{e[param.param] && e[param.param].slice(0, 15)}</Text>
                  ))}                  
                </VStack>
              </CardBody>
            </Card>
          ))
        )}
      </Flex>
  );
};
