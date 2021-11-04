import React, { useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  RadioButton,
  Avatar,
  TextInput,
} from "grommet";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import CardMinimize from "../components/CardMinimize";
import { Brush, DocumentPdf, Image, Like, ChatOption } from "grommet-icons";
import ConfirmButton from "../components/ConfirmButton";
import { useHistory, useLocation } from "react-router-dom";

const PracticeInfo = (props) => {
  const cardPad = { vertical: "xsmall", horizontal: "small" };

  const LikeBtn = (props) => {
    const [selected, setSelected] = useState(false);

    return (
      <Box
        border={!props.plain || false}
        round="xxsmall"
        align="center"
        width="70px"
        pad="xsmall"
      >
        <RadioButton
          label={
            <Text
              size={props.size || "16px"}
              color={selected ? "neutral-3" : "dark-2"}
            >
              Like
            </Text>
          }
          name="name"
          value="option 1"
          onClick={(event) => setSelected(!selected)}
        >
          {() => (
            <Like
              size={props.size || "14px"}
              color={selected ? "neutral-3" : "dark-2"}
            />
          )}
        </RadioButton>
      </Box>
    );
  };

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
        <Box
          direction="row"
          justify="between"
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
          <LikeBtn />
          <Box align="center" gap="xsmall" direction="row">
            <ChatOption size="18px" />
            Comments (2)
          </Box>
        </Box>
        <Box margin={{ top: "medium" }}>
          <Text>Comments Recents</Text>
          <Box pad="small" background="light-3">
            {[
              {
                responses: [
                  {
                    author: {
                      name: "Eliza",
                      photo: "",
                    },
                    comment: "I like it too",
                    likes: 1,
                    date: Date.now(),
                  },
                ],
                comment:
                  "#DOTA2 HERO GUIDES UPDATED TO PATCH 7.30e! 128+ guides have been reviewed and revised Corneta de festaCorneta de festaCorneta de festa",
                date: "2021/10/10 08:08:08",
                author: {
                  name: "MATHEUS PALHETA",
                  photo:
                    "https://pbs.twimg.com/profile_images/1440750487850995713/w_C14VpC_400x400.jpg",
                },
              },
            ].map((data) => (
              <Box>
                <Box direction="row" justify="between">
                  <Box align="center" gap="xsmall" direction="row">
                    {data.author.photo && (
                      <Avatar size="xsmall" src={data.author.photo} />
                    )}
                    <Text weight="bold" size="14px">
                      {data.author.name}
                    </Text>
                  </Box>
                  <Text size="12px">{data.date}</Text>
                </Box>
                <Text size="14px">{data.comment}</Text>
                <LikeBtn size="12px" plain />

                <Box gap="xsmall" direction="row">
                  <TextInput reverse placeholder="Response" />
                  <ConfirmButton color="status-error" label="Send" />
                </Box>
                {data.responses.map((res) => (
                  <Box pad={{ left: "medium", top: "small" }}>
                    <Box direction="row" justify="between">
                      <Box align="center" gap="xsmall" direction="row">
                        {res.author.photo && (
                          <Avatar size="xsmall" src={res.author.photo} />
                        )}
                        <Text weight="bold" size="14px">
                          {res.author.name}
                        </Text>
                      </Box>
                      <Text size="12px">{res.date}</Text>
                    </Box>
                    <Text size="14px">{res.comment}</Text>
                    <LikeBtn size="12px" plain />

                    <Box gap="xsmall" direction="row">
                      <TextInput reverse placeholder="Response" />
                      <ConfirmButton color="status-error" label="Send" />
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
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
  let location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Box direction="row">
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
