import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Box } from "@razorpay/blade/components";

const MainLayout = () => {
  return (
    <>
      <Box display="flex" height="100vh">
        <Sidebar />
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          overflow="auto"
          height="100vh"
        >
          <Navbar />
          <Box margin="spacing.9" height="100%">
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
