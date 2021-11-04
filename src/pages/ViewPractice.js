import React, { useState, useEffect } from "react";
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
import api from "../api";

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
        <Box height="70px" fill="horizontal" gap="small" direction="row">
          {[
            {
              label: "Likes",
              count: props.likes,
            },
            {
              label: "Views",
              count: props.views,
            },
            {
              label: "Comments",
              count: props.comments.length,
            },
          ].map((data) => (
            <Card fill="horizontal" background="light-2">
              <CardHeader pad={cardPad}>{data.label}</CardHeader>
              <CardBody pad={cardPad}>
                <Text weight="bold">{data.count}</Text>
              </CardBody>
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
          <Text size="14px">{props.description}</Text>
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
          <Text size="14px">
            Organizational Type: {props.organization_type}
          </Text>
          <Text size="14px">
            Development Process: {props.development_process}
          </Text>
          <Text size="14px">Context: {props.context}</Text>
          <Text size="14px">Data Source: {props.data_source}</Text>
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
          <Text size="14px">{props.challenges.join(", ")}</Text>
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
            Comments ({props.comments.length})
          </Box>
        </Box>
        <Box margin={{ top: "medium" }}>
          <Text>Comments Recents</Text>
          <Box pad="small" background="light-3">
            {props.comments.map((data) => (
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
                  <Text size="12px">{new Date(data.date).toUTCString()}</Text>
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
                      <Text size="12px">
                        {new Date(res.date).toUTCString()}
                      </Text>
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
            {props.name}
          </Text>
        </Box>
        <Text size="14px">{props.description}</Text>
        {[
          { label: "Contribution Type", value: props.contribution_type },
          {
            label: "Authors",
            value: props.authors.map((a) => a.author_name).join(", "),
          },
          { label: "Reference", value: props.reference },
          { label: "DOI", value: props.doi },
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
          {props.files.map((file) => (
            <Box
              direction="row"
              align="center"
              gap="xxsmall"
            >
              {file.filedata.split(";", 1)[0] === "data:image/png" && (
                <Image size="14px" />
              )}
              {file.filedata.split(";", 1)[0] === "data:image/jpeg" && (
                <Image size="14px" />
              )}
              {file.filedata.split(";", 1)[0] === "data:application/pdf" && (
                <DocumentPdf size="14px" />
              )}
              {file.filename}
            </Box>
          ))}
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
  const history = useHistory();

  const [showSidebar, setShowSidebar] = useState(true);
  const [practiceData, setPracticeData] = useState();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await api.get("/practices", {
          params: {
            practice_id: location.state,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setPracticeData(data);
      } catch (e) {
        // setErrors(["Error on token validation, do login"]);
        setTimeout(() => {
          history.push("/practices");
        }, 1000);
      }
    })();
  }, [history, location.state]);

  return (
    <Box direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="small" fill background="light-3">
          {practiceData && (
            <CardMinimize
              pad="small"
              headerColor="light-1"
              header="Practice Information"
              body={<PracticeInfo {...practiceData} />}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewPractice;
