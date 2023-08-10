import "@/styles/globals.css";
import Chakra from "@/components/chakra";
import Fonts from "@/components/fonts";
import { UserProvider } from "@/components/context/userContext";
import { CarterasProvider } from "@/components/context/carterasContext";
import { CheckAuth } from "@/components/auth";
import { OperationProvider } from "@/components/context/operationContext";
import Layout from "@/components/Layouts/main";
import { useRouter } from 'next/router';
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname === '/' ? 'Home' : capitalizeFirstLetter(router.pathname.substring(1));
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // Evitar renderizar el layout en la página de inicio de sesión y en la página 404
  if (router.pathname === '/login' || router.pathname === '/404') {
    return (
      <Chakra>
        <Fonts />
        <Component {...pageProps} />
      </Chakra>
    );
  }
  return (
    <UserProvider>
      <CarterasProvider>
        <OperationProvider>
          <CheckAuth>
            <Chakra>
              <Fonts />
              <Layout title={pathname}>
                <Component {...pageProps} />
              </Layout>
            </Chakra>
          </CheckAuth>
        </OperationProvider>
      </CarterasProvider>
    </UserProvider>
  );
}