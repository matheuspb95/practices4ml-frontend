import React, { useState, useEffect } from "react";
import {
  Box,
  DataTable,
  Text,
  Avatar,
  Button,
  Pagination,
  Footer,
  TextInput,
} from "grommet";
import { Edit, Folder, Search } from "grommet-icons";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import AlertModal from "../components/AlertModal";
import api from "../api";
import { useHistory } from "react-router-dom";

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
        {props.swebok ? props.swebok.join(", ") : ""}
      </Text>
    </Box>
  );
};

const Practices = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await api.get("/practices", {
          params: {
            limit: 0,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setListData(
          data.map((d, i) => {
            return { ...d, key: i };
          })
        );
      } catch (e) {
        setErrors(["Error on token validation, do login"]);
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      }
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
          <Box background="light-1">
            <Box margin="small">
              <Text margin={{ vertical: "xsmall" }} size="16px">
                Practices
              </Text>
              <TextInput
                onChange={(evt) => {
                  setPage(1);
                  setSearch(evt.target.value);
                }}
                placeholder="type practice name here"
                reverse
                icon={<Search />}
              />
            </Box>
            <Box>
              {listData.length > 0 && (
                <DataTable
                  margin={{ top: "small" }}
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
                        return (
                          <Text size="12px">{pract.contribution_type}</Text>
                        );
                      },
                    },
                    {
                      property: "swebok",
                      header: <Text {...headerProps}>Knowledge Areas</Text>,
                      render: areasField,
                    },
                    {
                      property: "buttons",
                      render: (pract) => {
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
                            {pract.editable && (
                              <Button
                                size="small"
                                style={{ borderRadius: "4px" }}
                                primary
                                color="accent-3"
                                label="Edit"
                                icon={<Edit size="14px" />}
                                onClick={() => {
                                  history.push("/update-practice", pract);
                                }}
                              />
                            )}
                          </Box>
                        );
                      },
                    },
                  ]}
                  border={{
                    color: "light-4",
                    side: "horizontal",
                    size: "xsmall",
                  }}
                  data={listData
                    .filter((d) =>
                      d.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .slice((page - 1) * 5, page * 5)}
                />
              )}
            </Box>
          </Box>
        </Box>
        <Footer justify="center">
          <Pagination
            numberMiddlePages={6}
            margin="small"
            onChange={({ page }) => setPage(page)}
            size="small"
            step={5}
            numberItems={
              listData.filter((d) =>
                d.name.toLowerCase().includes(search.toLowerCase())
              ).length
            }
          />
        </Footer>
      </Box>
      <AlertModal errors={errors} />
    </Box>
  );
};

export default Practices;
