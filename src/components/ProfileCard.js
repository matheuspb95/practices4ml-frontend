import React, { useState } from "react";
import {
  Box,
  Text,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Layer,
  Heading,
  FileInput,
} from "grommet";
import { Edit } from "grommet-icons";

const ProfileCard = (props) => {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <Card
        margin={{ top: "medium" }}
        style={{ height: "fit-content", minWidth: "245px", maxWidth: "245px" }}
        round="xsmall"
        background="white"
      >
        <CardHeader
          border={[
            {
              color: "blue",
              size: "3px",
              style: "solid",
              side: "top",
            },
            {
              color: "light-4",
              size: "xsmall",
              style: "solid",
              side: "bottom",
            },
          ]}
          pad={{ horizontal: "medium", vertical: "small" }}
          justify="center"
        >
          <Box justify="center">
            <Box
              width="100px"
              round="full"
              alignSelf="center"
              border={{ color: "dark-4", size: "small" }}
              pad="xxsmall"
            >
              <Avatar size="xlarge" src={props.userData.photo} />
            </Box>
            <Box gap="small" pad="xsmall">
              <Button
                onClick={() => setShowUpload(true)}
                color="dark-1"
                plain
                label="Edit"
                icon={<Edit size="16px" color="dark-1" />}
              />
              <Text textAlign="center">{props.userData.name}</Text>
              <Text textAlign="center" pad="small" color="dark-3" size="16px">
                {props.userData.occupation || "Set your occupation"}
              </Text>
              <Text textAlign="center" pad="small" color="dark-3" size="14px">
                Your photo appears on your Profile page and with your comments
                across the portal.
              </Text>
            </Box>
          </Box>
        </CardHeader>
        <CardBody pad={{ left: "small", right: "small", bottom: "small" }}>
          <Box
            pad={{ vertical: "small" }}
            direction="row"
            justify="between"
            border={[
              {
                color: "light-3",
                size: "small",
                side: "bottom",
              },
            ]}
          >
            <Text size="14px" pad="small" weight="bold">
              Followers
            </Text>
            <Text size="14px" pad="small" weight="light" color="neutral-3">
              100
            </Text>
          </Box>
          <Box
            pad={{ vertical: "small" }}
            direction="row"
            justify="between"
            border={[
              {
                color: "light-3",
                size: "small",
                side: "bottom",
              },
            ]}
          >
            <Text size="14px" pad="small" weight="bold">
              Following
            </Text>
            <Text size="14px" pad="small" weight="light" color="neutral-3">
              89
            </Text>
          </Box>
        </CardBody>
      </Card>
      {showUpload && (
        <Layer
          onEsc={() => setShowUpload(false)}
          onClickOutside={() => setShowUpload(false)}
        >
          <Box pad="medium">
            <Heading color="status-error">UPLOAD FILE</Heading>
            <FileInput
              name="file"
              onChange={(event) => {
                const fileList = event.target.files;
                for (let i = 0; i < fileList.length; i += 1) {
                  const file = fileList[i];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    props.setUserData({ photo: reader.result });
                    setShowUpload(false);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <Button label="close" onClick={() => setShowUpload(false)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default ProfileCard;
