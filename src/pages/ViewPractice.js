import React, { useState } from "react";
import { Box, Text } from "grommet";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const ViewPractice = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Box fill direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="small" fill background="light-3">
          VIEW PRACTICE
        </Box>
      </Box>
    </Box>
  );
};

export default ViewPractice;
