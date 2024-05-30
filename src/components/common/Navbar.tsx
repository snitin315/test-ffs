import { Box, MyAccountIcon } from "@razorpay/blade/components";
import Domain from "./Domain";

const Navbar = () => {
  return (
    <>
      <Box
        minHeight="63px"
        display="flex"
        gap="spacing.5"
        paddingRight="spacing.5"
        flexDirection="row-reverse"
        alignItems="center"
        backgroundColor="surface.background.gray.moderate"
      >
        <MyAccountIcon size="2xlarge" />
        <Domain />
      </Box>
    </>
  );
};

export default Navbar;
