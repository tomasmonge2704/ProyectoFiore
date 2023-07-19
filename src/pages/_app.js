import "@/styles/globals.css";
import Chakra from "@/components/chakra";
import Fonts from "@/components/fonts";
import { UserProvider } from "@/components/context/userContext";
import { CarterasProvider } from "@/components/context/carterasContext";
import { CheckAuth } from "@/components/auth";
import { OperationProvider } from "@/components/context/operationContext";
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <CarterasProvider>
        <OperationProvider>
          <CheckAuth>
            <Chakra>
              <Fonts />
              <Component {...pageProps} />
            </Chakra>
          </CheckAuth>
        </OperationProvider>
      </CarterasProvider>
    </UserProvider>
  );
}
