import React, { useState } from "react";
import { Box, Text } from "grommet";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Home = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Box fill direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="small" fill background="light-3">
          <Text>SE4MLPractices</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
