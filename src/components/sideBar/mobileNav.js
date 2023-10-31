import {
  IconButton,
  Avatar,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode
} from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { FiMenu, FiBell } from "react-icons/fi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
export const MobileNav = ({ onOpen,text, ...rest }) => {
  const {user} = useContext(UserContext); 
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const logOut = () => {
    localStorage.removeItem('token')
    router.replace("/login");
  }
  return (
      <Flex
      display={{ base: "flex", md: "none" }}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text as="b" fontSize='4xl' display={{ base: "none", md: "initial" }}>{text}</Text>
      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton size="lg"
          variant="ghost"
          aria-label="open menu" onClick={toggleColorMode} icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user && user.username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Rol: {user && user.role}
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
