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
      <Text as="b" fontSize='4xl'>{text}</Text>
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
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
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
