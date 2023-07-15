import { useState } from 'react';
import {
  Flex,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function SimpleCard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Nuevo estado para controlar el estado del inicio de sesión
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoggingIn(true); // Deshabilitar el botón de login al iniciar sesión

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Error en el inicio de sesión');
      }
      const { token } = await response.json();
      localStorage.setItem('token', token);
      router.push('/');
    } catch (error) {
      setError('Las credenciales no son correctas.');
    } finally {
      setIsLoggingIn(false); // Habilitar el botón de login después de la respuesta del backend
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} minWidth={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            {error && (
              <Alert status="error" rounded="md">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleLogin}
                isLoading={isLoggingIn}
                disabled={isLoggingIn}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
