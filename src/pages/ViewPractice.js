import React, { useState } from "react";
import { Box, Card, CardBody, CardHeader, CardFooter, Text } from "grommet";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import CardMinimize from "../components/CardMinimize";
import { Brush, DocumentPdf, Image } from "grommet-icons";
import ConfirmButton from "../components/ConfirmButton";

const PracticeInfo = (props) => {
  const cardPad = { vertical: "xsmall", horizontal: "small" };

  const LeftContent = () => {
    return (
      <Box margin="0px" width="large">
        <Box height="100px" fill="horizontal" gap="small" direction="row">
          {[
            { label: "Likes", count: "41,100", percentage: "70%" },
            { label: "Views", count: "41,100", percentage: "70%" },
            { label: "Comments", count: "41,100", percentage: "70%" },
          ].map((data) => (
            <Card fill="horizontal" background="light-2">
              <CardHeader pad={cardPad}>{data.label}</CardHeader>
              <CardBody pad={cardPad}>
                <Text weight="bold">{data.count}</Text>
              </CardBody>
              <CardFooter pad={cardPad}>
                <Box
                  width="medium"
                  direction="row"
                  border={[
                    {
                      color: "dark-5",
                      size: "small",
                      style: "solid",
                      side: "top",
                    },
                  ]}
                >
                  <Text>{data.percentage}</Text>
                </Box>
              </CardFooter>
            </Card>
          ))}
        </Box>
        <Box
          border={[
            {
              color: "dark-5",
              size: "small",
              style: "solid",
              side: "bottom",
            },
          ]}
          pad={{ vertical: "small" }}
        >
          <Text weight="bold">Details of the Practice</Text>
          <Text size="14px">
            Details of the Practice Details of the Practice Details of the
            Practice Details of the Practice Details of the Practice Details of
            the Practice Details of the Practice Details of the Practice Details
            of the Practice Details of the Practice Details of the Practice
          </Text>
        </Box>
        <Box
          border={[
            {
              color: "dark-5",
              size: "small",
              style: "solid",
              side: "bottom",
            },
          ]}
          pad={{ vertical: "small" }}
        >
          <Text size="16px">Organizational Context</Text>
          <Text size="14px">Organizational Type: Small</Text>
          <Text size="14px">Development Process: Research-Based</Text>
          <Text size="14px">Context: In-house</Text>
          <Text size="14px">Data Source: Private</Text>
        </Box>
        <Box
          border={[
            {
              color: "dark-5",
              size: "small",
              style: "solid",
              side: "bottom",
            },
          ]}
          pad={{ vertical: "small" }}
        >
          <Text size="16px">Challenges</Text>
          <Text size="14px">Requirements, Design, Process</Text>
        </Box>
        <Box
          border={[
            {
              color: "dark-5",
              size: "small",
              style: "solid",
              side: "bottom",
            },
          ]}
          pad={{ vertical: "small" }}
        >
          <Text size="16px">Additional Information Practice</Text>
          <Text size="14px">Information...</Text>
        </Box>
      </Box>
    );
  };

  const RightContent = () => {
    return (
      <Box gap="small" width="medium">
        <Box direction="row" gap="xsmall" align="center">
          <Brush size="20px" color="neutral-3" />
          <Text size="22px" color="neutral-3">
            Practice Name
          </Text>
        </Box>
        <Text size="14px">
          Practice Description Practice Description Practice Description
          Practice Description Practice Description Practice Description
          Practice Description Practice Description Practice Description
          Practice Description Practice Description Practice Description
          Practice Description Practice Description Practice Description
        </Text>
        {[
          { label: "Contribution Type", value: "Contribution Type" },
          { label: "Authors", value: "Authors" },
          { label: "Reference", value: "Reference" },
          { label: "DOI", value: "DOI" },
        ].map((data) => (
          <Box>
            <Text size="14px">{data.label}</Text>
            <Text weight="bold" size="14px">
              {data.value}
            </Text>
          </Box>
        ))}
        <Box />
        <Box>
          <Text>Practices Files</Text>
          <Box direction="row" align="center" gap="xxsmall">
            <DocumentPdf size="14px" />
            Filename.pdf
          </Box>
          <Box direction="row" align="center" gap="xxsmall">
            <Image size="14px" />
            Filename.png
          </Box>
        </Box>
        <Box />
        <Box width="small">
          <ConfirmButton color="accent-4" label="Authors contacts" />
        </Box>
      </Box>
    );
  };

  return (
    <Box pad="0px" gap="small" direction="row" justify="stretch">
      <LeftContent />
      <RightContent />
    </Box>
  );
};

const ViewPractice = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Box fill direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="small" fill background="light-3">
          <CardMinimize
            pad="small"
            headerColor="light-1"
            header="Practice Information"
            body={<PracticeInfo />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ViewPractice;
