import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
  RadioButton,
  Avatar,
  TextInput,
  Form,
} from "grommet";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import CardMinimize from "../components/CardMinimize";
import AlertModal from "../components/AlertModal";
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
          onClick={(event) => {
            if (!selected) {
              setSelected(true);
              props.like();
            }
          }}
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

  const LeftContent = (props) => {
    return (
      <Box margin="0px" width="large">
        <Box height="70px" fill="horizontal" gap="small" direction="row">
          {[
            {
              label: "Likes",
              count: props.likes || 0,
            },
            {
              label: "Views",
              count: props.views || 0,
            },
            {
              label: "Comments",
              count: props.comments?.length || 0,
            },
          ].map((data) => (
            <Card key={data.label} fill="horizontal" background="light-2">
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
          <Text size="18px">Organizational Context</Text>
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
          <Text size="18px">Challenges</Text>
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
          <Text size="18px">SE Knowledge Areas</Text>
          <Text size="14px">{props.swebok.join(",")}</Text>
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
          <LikeBtn
            like={() => {
              props.likePractice();
            }}
          />
          <Box align="center" gap="xsmall" direction="row">
            <ChatOption size="18px" />
            Comments ({props.comments?.length || "0"})
          </Box>
        </Box>
        <Box margin={{ top: "medium" }}>
          <Text>Comments Recents</Text>
          <Box pad="small" background="light-3">
            {props.comments &&
              props.comments.reverse().map((data, index) => {
                return (
                  <Box
                    key={index}
                    pad={{ vertical: "xsmall" }}
                    border={[
                      {
                        color: "dark-5",
                        size: "small",
                        style: "solid",
                        side: "bottom",
                      },
                    ]}
                  >
                    <Box direction="row" justify="between">
                      <Box align="center" gap="xsmall" direction="row">
                        {data.author.photo && (
                          <Avatar size="xsmall" src={data.author.photo} />
                        )}
                        <Text weight="bold" size="14px">
                          {data.author.name}
                        </Text>
                      </Box>
                      <Text size="12px">
                        {new Date(data.date).toUTCString()}
                      </Text>
                    </Box>
                    <Text size="14px">{data.comment}</Text>
                    <LikeBtn
                      size="12px"
                      plain
                      like={() => {
                        props.likeComment(index);
                      }}
                    />
                    <Form onSubmit={(evt) => props.submitComment(evt, index)}>
                      <Box gap="xsmall" direction="row">
                        <TextInput
                          name="comment"
                          reverse
                          placeholder="Response"
                        />
                        <ConfirmButton color="status-error" label="Send" />
                      </Box>
                    </Form>
                    {data.responses &&
                      data.responses.map((res, i) => (
                        <Box key={i} pad={{ left: "medium", top: "small" }}>
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
                          <LikeBtn
                            like={() => {
                              props.likeResponse(index, i);
                            }}
                            size="12px"
                            plain
                          />
                        </Box>
                      ))}
                  </Box>
                );
              })}
          </Box>
          <Box pad={{ vertical: "small" }}>
            <Text weight="bold">Add comment</Text>
            <Form onSubmit={props.submitComment}>
              <Box gap="xsmall" direction="row">
                <TextInput name="comment" reverse placeholder="Comment" />
                <ConfirmButton color="status-error" label="Send" />
              </Box>
            </Form>
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
        ].map((data, i) => (
          <Box key={data.value + i}>
            <Text size="14px">{data.label}</Text>
            <Text weight="bold" size="14px">
              {data.value}
            </Text>
          </Box>
        ))}
        <Box />
        <Box>
          <Text>Practices Files</Text>
          {props.files.map((file, i) => (
            <a key={i} href={file.filedata} download={file.filename}>
              <Box direction="row" align="center" gap="xxsmall">
                {file.filedata.split(";", 1)[0] === "data:image/png" && (
                  <Image size="14px" />
                )}
                {file.filedata.split(";", 1)[0] === "data:image/jpeg" && (
                  <Image size="14px" />
                )}
                {file.filedata.split(";", 1)[0] === "data:application/pdf" && (
                  <DocumentPdf size="14px" />
                )}
                <Text color="dark-1" size="14px">
                  {file.filename}
                </Text>
              </Box>
            </a>
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
      <LeftContent {...props} />
      <RightContent />
    </Box>
  );
};

const ViewPractice = (props) => {
  let location = useLocation();
  const history = useHistory();

  const [showSidebar, setShowSidebar] = useState(true);
  const [practiceData, setPracticeData] = useState();
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

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
        setErrors(["Error on token validation, do login"]);
        setTimeout(() => {
          history.push("/practices");
        }, 1000);
      }
    })();
  }, [history, location.state]);

  const likePractice = () => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        await api.put(
          "/practices/like",
          {},
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              practice_id: location.state,
            },
          }
        );
      } catch (e) {
        setErrors(["Error on like, try again later"]);
      }
    })();
  };

  const likeComment = (comment_id) => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        await api.put(
          "/practices/like",
          {},
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              practice_id: location.state,
              comment_id: comment_id,
            },
          }
        );
      } catch (e) {
        setErrors(["Error on like, try again later"]);
      }
    })();
  };

  const likeResponse = (comment_id, response_id) => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        await api.put(
          "/practices/like",
          {},
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              practice_id: location.state,
              comment_id: comment_id,
              response_id: response_id,
            },
          }
        );
      } catch (e) {
        setErrors(["Error on like, try again later"]);
      }
    })();
  };

  const submitComment = ({ value }, comment_id) => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        await api.post("/practices/comment", value, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: comment_id
            ? {
                practice_id: location.state,
                comment_id: comment_id,
              }
            : {
                practice_id: location.state,
              },
        });
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (e) {
        setErrors(["Error on send comment, try again later"]);
      }
    })();
  };

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
              body={
                <PracticeInfo
                  likePractice={likePractice}
                  likeComment={likeComment}
                  likeResponse={likeResponse}
                  submitComment={submitComment}
                  {...practiceData}
                />
              }
            />
          )}
        </Box>
      </Box>
      <AlertModal
        errors={errors}
        setErrors={setErrors}
        success={success}
        successText="PRACTICE SAVED"
      />
    </Box>
  );
};

export default ViewPractice;
