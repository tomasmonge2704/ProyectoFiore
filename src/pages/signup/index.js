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
  Link
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function SimpleCard() {
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Nuevo estado para controlar el estado del inicio de sesión
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoggingIn(true); // Deshabilitar el botón de login al iniciar sesión

    try {
      const response = await fetch(`${process.env.API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username,mail, password }),
      });

      if (!response.ok) {
        const {error} = await response.json();
        setError(error)
        return;
    }
      const { token } = await response.json();
      localStorage.setItem('token', token);
      router.push('/');
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
          p={8}
        >
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input variant="filled" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Mail</FormLabel>
              <Input variant="filled" type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input variant="filled" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            {error && (
              <Alert status="error" rounded="md">
                <AlertIcon />
                {error}
              </Alert>
            )}
            
              <Button
                colorScheme="orange"
                onClick={handleLogin}
                isLoading={isLoggingIn}
                isDisabled={password && mail && username ? false : true}
              >
                Submit
              </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
