import { Box, Divider, Heading } from "@razorpay/blade/components";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      backgroundColor="surface.background.primary.subtle"
      width="300px"
      display="flex"
      flexDirection="column"
      position="sticky"
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Box
          paddingY="spacing.6"
          paddingX="spacing.8"
          textAlign="center"
          display="flex"
          flexDirection="column"
        >
          <Heading
            weight="regular"
            size="medium"
            color="surface.text.gray.subtle"
          >
            Fin Fortify
          </Heading>
          <Divider
            orientation="horizontal"
            variant="normal"
            marginTop="spacing.5"
          />
        </Box>
      </Link>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="spacing.8"
        marginTop="spacing.6"
      >
        {appRoutes.map((route, index) =>
          route.sidebarProps ? <SidebarItem item={route} key={index} /> : null
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
