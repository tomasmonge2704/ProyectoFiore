import {
    Flex,
    Icon,
    Link
  } from '@chakra-ui/react';

export const NavItem = ({ icon,active,href, children, ...rest }) => {
    return (
      <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          color={active && "rgb(234 93 63)"}
          _hover={{
            bg: 'rgb(234 93 63)',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };