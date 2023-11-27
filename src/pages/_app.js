import "@/styles/globals.css";
import Chakra from "@/components/chakra";
import Fonts from "@/components/fonts";
import { CheckAuth } from "@/components/auth";
import Layout from "@/components/Layouts/main";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname === '/' ? 'Home' : capitalizeFirstLetter(router.pathname.substring(1));

  useEffect(() => {
    // Si la ruta contiene un valor [id], actualiza el título de la página con ese valor
    if (router.query.id) {
      const dynamicTitle = router.query.id;
      document.title = dynamicTitle;
    }
  }, [router.query.id]);

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
      <CheckAuth>
        <Chakra>
          <Fonts />
          <Layout title={pathname}>
            <Component {...pageProps} />
          </Layout>
        </Chakra>
      </CheckAuth>
  );
}
