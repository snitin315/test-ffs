import { Box, Heading, Text, List, ListItem } from "@razorpay/blade/components";
import DomainForm from "./DomainForm";

const HomePage = () => {
  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column" flex="1" gap="spacing.8">
        <Heading size="xlarge">Welcome to Fin Fortify Dashboard</Heading>
        <Box display="flex" flex="1">
        <Text size="large" marginTop="spacing.8">
          Fin-fortify is a risk engine signed to mitigate fraudulent activities
          and assess risk factors associated with financial transactions. It
          operates independently of specific use cases and is configurable to
          cater to various scenarios. It offers an out of the box and plug and
          play model for fraud detection and risk assessment for any use case.
          The primary objective of the Risk Engine project is to provide a
          robust, open-source solution for risk assessment.
        </Text>
        </Box>
      </Box>
      <Box flex="1" display="flex" height="100%" justifyContent="center" alignItems="center">
        <DomainForm />
      </Box>
    </Box>
  );
};

export default HomePage;
