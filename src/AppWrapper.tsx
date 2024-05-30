import { BladeProvider, ToastContainer } from "@razorpay/blade/components";
import { bladeTheme } from "@razorpay/blade/tokens";
import App from "./App.tsx";
import DomainContextProvider from "./context/DomainContextProvider.tsx";

const AppWrapper = () => {
  return (
    <BladeProvider themeTokens={bladeTheme} colorScheme="light">
      <DomainContextProvider>
      <ToastContainer />
      <App />
      </DomainContextProvider>
    </BladeProvider>
  );
};

export default AppWrapper;
