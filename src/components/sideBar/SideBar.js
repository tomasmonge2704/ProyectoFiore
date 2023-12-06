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
  IconButton,
  Badge,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@chakra-ui/react";
import {
  FiHome,
  FiArrowUp,
  FiBox,
  FiUser,
  FiSettings,
  FiBell,
  FiPieChart,
} from "react-icons/fi";
import { NavItem } from "./navItem";
import { MobileNav } from "./mobileNav";
import { useRouter } from "next/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useStoreUser } from "@/store/user";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
const LinkItems = [
  { name: "Home", icon: FiHome, href: "/", text: "" },
  { name: "Metrics", icon: FiPieChart, href: "/metrics", text: "" },
  { name: "Buyers", icon: FiUser, href: "/Buyers", text: "BUYERS" },
  {
    name: "Shippers",
    icon: FiBox,
    href: "/Shippers",
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
  const user = useStoreUser((state) => state.user);
  const logOut = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };
  const { colorMode, toggleColorMode } = useColorMode();
  const [cantidadNotificaciones, setCantidadNotificaciones] = useState(0);
  const [notificaciones] = useFetch(`${process.env.API_URL}/notifications`, []);
  useEffect(() => {
    if (notificaciones.length) setCantidadNotificaciones(notificaciones.length);
  }, [notificaciones]);
  return (
    <Box
      mt={{ base: 0, md: 4 }}
      ml={{ base: 0, md: 4 }}
      transition="3s ease"
      w={{ base: "full", md: 20 }}
      boxShadow="lg"
      borderRadius={"15px"}
      pos="fixed"
      h={{ base: "full", md: "96vh" }}
      {...rest}
    >
      <Box
        bg={useColorModeValue("#ffffff40", "")}
        h="full"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Image
          src="/logo.jpg"
          p={2}
          display={{ base: "none", md: "inherit" }}
        />
        <Flex
          h="20"
          display={{ base: "flex", md: "none" }}
          alignItems="center"
          mx="8"
          mb={4}
          justifyContent="space-between"
        >
          <Image src="./logo.png" />
          <CloseButton onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            href={link.href}
            active={link.href === router.pathname && true}
            icon={link.icon}
          >
            {link.name}
          </NavItem>
        ))}
        <Flex
          justify="center"
          h="75vh"
          direction="column"
          alignItems={"center"}
          display={{ base: "none", md: "flex" }}
        >
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
          <Menu>
            <MenuButton
              as={IconButton}
              size="lg"
              variant="ghost"
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
              aria-label="open menu"
              icon={
                <>
                  <FiBell />
                  {cantidadNotificaciones > 0 && (
                    <Badge
                      colorScheme="red"
                      position="absolute"
                      top="0"
                      right="0"
                      fontSize="0.8em"
                      borderRadius="3xl"
                    >
                      {cantidadNotificaciones}
                    </Badge>
                  )}
                </>
              }
            />

            <MenuList zIndex="modal">
              {cantidadNotificaciones > 0 ? (
                notificaciones.map((notificacion, index) => (
                  <VStack key={index} spacing={3}>
                    <Box
                    w="full"
                    p={2}
                    mt={2}
                      borderLeft="5px solid orange"
                      _hover={{ shadow: "md"}}
                    >
                      <Text as="b">{notificacion.refNumber}</Text>
                      <Text alignItems="center">Is arriving in <Badge ml={1} colorScheme="orange">{notificacion.timeToArrival}</Badge></Text>
                    </Box>
                    <Divider />
                  </VStack>
                ))
              ) : (
                <Text>No hay notificaciones</Text>
              )}
            </MenuList>
          </Menu>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} />
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
                zIndex="modal"
              >
                <MenuItem>Settings</MenuItem>
                <MenuItem>
                  {user && user.username} | {user && user.role}
                </MenuItem>
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
