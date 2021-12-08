import React, { useState } from "react";
import { Box, Text, Card, CardBody, CardHeader } from "grommet";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Link from "../components/Link";

const About = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Box direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="medium" fill background="light-3">
          <Text size="28px" color="black">
            About
          </Text>
          <Card
            margin={{ vertical: "small" }}
            round="xsmall"
            background="light-1"
          >
            <CardHeader
              pad="medium"
              border={{ side: "bottom", size: "1px", color: "light-6" }}
            >
              <Text>About Us</Text>
            </CardHeader>
            <CardBody gap="medium" pad="medium">
              <Text>
                SEPractices4ML provides SE practices for Machine Learning
                systems development. The practices on this site are collected
                from the different digital libraries such as ACM, Scopus, IEEE
                and Engineering Village. In an effort to help the community,
                this portal sharing a list of practices that were found in
                literature and classified in Model, Theory, Framework/methods,
                Guidelines, Lessons learned, Advice/implications and Tool.
              </Text>
              <Text>
                All practices are by different authors that published their
                results at conferences or in journals recognized by the
                communities. We have included the main information for each
                practice and for more details we have included the authors'
                references.
              </Text>
              <Text>
                If you have suggestions for other SE practices for ML consider
                sending by option "Send Proposal".
              </Text>
              <Text>
                If you want to contact us send for{" "}
                <Link label="sepratices4ml@gmail.com"></Link> .
              </Text>
              <Text>
                Please, we want to have your opinion about SEPractices4ML.{" "}
                <Link label="Click here"></Link>
              </Text>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
