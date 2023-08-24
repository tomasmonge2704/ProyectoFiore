import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  useColorMode,
  Drawer,
  DrawerContent,
  useDisclosure,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  HStack,
  Avatar,
  VStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import {
  FiHome,
  FiArrowUp,
  FiBox,
  FiUser,
  FiSettings,
  FiBell,
} from "react-icons/fi";
import { NavItem } from "./navItem";
import { MobileNav } from "./mobileNav";
import { useRouter } from "next/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
const LinkItems = [
  { name: "Home", icon: FiHome, href: "/", text: "" },
  { name: "Buyers", icon: FiUser, href: "/cartera-clientes", text: "BUYERS" },
  {
    name: "Shippers",
    icon: FiBox,
    href: "/cartera-proveedores",
    text: "SHIPPERS",
  },
  { name: "New operation", icon: FiArrowUp, href: "/operation", text: "" },
  { name: "Configuration", icon: FiSettings, href: "/ajustes", text: "" },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  function getTextByHref(searchText) {
    for (const item of LinkItems) {
      if (item.href === searchText) {
        return item.text;
      }
    }
    return null;
  }
  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} text={getTextByHref(router.pathname)} />
      <Box ml={{ base: 0, md: 24 }} p="4">
        {children}
      </Box>
    </>
  );
}
const SidebarContent = ({ onClose, ...rest }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const logOut = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      mt={{ base: 0, md: 4 }}
      ml={{ base: 0, md: 4 }}
      transition="3s ease"
      w={{ base: "full", md: 20 }}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={"15px"}
      pos="fixed"
      h={{base:"full",md:"96vh"}}
      {...rest}
    >
      <Box
        bg={useColorModeValue("#ffffff40", "")}
        h="full"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Image src="./logo.png" p={2} display={{ base: "none", md: "inherit" }} />
        <Flex
          h="20"
          display={{ base: "flex", md: "none" }}
          alignItems="center"
          mx="8"
          mb={4}
          justifyContent="space-between"
        >
          <Image src="./logo.png"/>
          <CloseButton
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            href={link.href}
            active={link.href === router.pathname && true}
            icon={link.icon}>
            {link.name}
            </NavItem>
        ))}
        <Flex
          justify="center"
          h="75vh"
          direction="column"
          alignItems={"center"}
          display={{ base: "none",md:"flex"}}
        >
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
                zIndex="modal"
              >
                <MenuItem>Settings</MenuItem>
                <MenuItem>{user && user.username} | {user && user.role}</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
