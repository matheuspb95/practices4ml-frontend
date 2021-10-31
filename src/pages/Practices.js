import React, { useState, useEffect } from "react";
import { Box, DataTable, Text, Avatar, Button } from "grommet";
import { Edit, Folder } from "grommet-icons";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import api from "../api";

const nameField = (props) => {
  return (
    <Box gap="xsmall">
      <Text size="16px">{props.name}</Text>
      {props.create_date ? (
        <Text size="12px">
          Created {props.create_date.split("T")[0].replaceAll("-", ".")}
        </Text>
      ) : (
        <Text size="12px">Created --.--.----</Text>
      )}
    </Box>
  );
};

const authorsField = (props) => {
  return (
    <Box justify="center" direction="row">
      {props.authors.map((author) => {
        return (
          <Box round="full" alignSelf="center" pad="xxsmall">
            <Avatar background="accent-1" size="medium" src={author.photo}>
              {author.author_name.split(" ").map((n) => n[0])}
            </Avatar>
          </Box>
        );
      })}
    </Box>
  );
};

const areasField = (props) => {
  return (
    <Box alignSelf="center" pad="xxsmall" background="neutral-1" round="xsmall">
      <Text textAlign="center" size="12px" weight="bold">
        {props.swebok.join(", ")}
      </Text>
    </Box>
  );
};

const buttonsField = (props) => {
  return (
    <Box direction="row" gap="small">
      <Button
        size="small"
        width="20px"
        style={{ borderRadius: "4px" }}
        primary
        color="neutral-3"
        label="View"
        icon={<Folder size="14px" />}
      />
      <Button
        size="small"
        style={{ borderRadius: "4px" }}
        primary
        color="accent-3"
        label="Edit"
        icon={<Edit size="14px" />}
      />
    </Box>
  );
};

const Practices = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await api.get("/practices", {
          params: {
            limit: 5
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setListData(data);
        console.log(data);
      } catch (e) {}
    })();
  }, []);

  const headerProps = {
    color: "black",
    size: "14px",
    alignSelf: "center",
  };

  return (
    <Box fill direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="small" fill background="light-3">
          <Text size="22px">All SE Practices</Text>
          <DataTable
            background={{
              header: { color: "light-1", opacity: "strong" },
              body: ["light-1", "light-3"],
              footer: { color: "dark-3", opacity: "strong" },
            }}
            columns={[
              {
                property: "#",
                header: <Text>#</Text>,
                render: () => <Text size="14px">#</Text>,
              },
              {
                property: "name",
                header: <Text {...headerProps}>Practice Name</Text>,
                render: nameField,
              },
              {
                property: "authors",
                header: <Text {...headerProps}>Authors</Text>,
                render: authorsField,
              },
              {
                property: "contribution_type",
                header: <Text {...headerProps}>Contribution Types</Text>,
                render: (pract) => {
                  return <Text size="12px">{pract.contribution_type}</Text>;
                },
              },
              {
                property: "swebok",
                header: <Text {...headerProps}>Knowledge Areas</Text>,
                render: areasField,
              },
              {
                property: "buttons",
                render: buttonsField,
              },
            ]}
            border={{
              color: "light-4",
              side: "horizontal",
              size: "xsmall",
            }}
            data={listData}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Practices;