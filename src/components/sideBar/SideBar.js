import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import {
  FiHome,
  FiArrowUp,
  FiBox,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import { NavItem } from "./navItem";
import { MobileNav } from "./mobileNav";
import { useRouter } from "next/router";
const LinkItems = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Buyers", icon: FiUser, href: "/cartera-clientes" },
  { name: "Clients", icon: FiBox, href: "/cartera-proveedores" },
  { name: "New operation", icon: FiArrowUp, href: "/operation" },
  { name: "Configuration", icon: FiSettings, href: "/ajustes" }
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </>
  );
}
const SidebarContent = ({ onClose, ...rest }) => {
  const router = useRouter();
  return (
    <Box
      transition="3s ease"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Box
        bg={useColorModeValue("#ffffff40", "")}
        h="full"
        borderRadius="25px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        marginLeft="5%"
        marginRight="5%"
      >
        <Flex h="20" alignItems="center" mx="8" mb={4} justifyContent="space-between">
          <Image src="./logo.png" />
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} href={link.href} active={link.href === router.pathname && true} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};
