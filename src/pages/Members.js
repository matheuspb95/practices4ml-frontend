import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Grid,
  Card,
  CardBody,
  CardFooter,
  TextInput,
  Avatar,
  Footer,
  Pagination,
} from "grommet";
import { Search, UserManager, Organization, Mail } from "grommet-icons";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ConfirmButton from "../components/ConfirmButton";
import AlertModal from "../components/AlertModal";
import api from "../api";
import { useHistory, useLocation } from "react-router-dom";

const Members = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const history = useHistory();
  let location = useLocation();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const params = location.state ? { practice_id: location.state } : {};
        const { data } = await api.get("/users", {
          params: params,
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setMembers(
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
  }, [history, location.state]);

  return (
    <Box direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="small" fill background="light-3">
          <Text margin={{ vertical: "xsmall" }} size="20px">
            {location.state ? "Authors" : "Members"}
          </Text>
          <Card round="xsmall" background="light-1" pad="small">
            <Box margin={{ vertical: "small", horizontal: "xlarge" }}>
              <TextInput
                onChange={(evt) => {
                  setPage(1);
                  setSearch(evt.target.value);
                }}
                placeholder="type member name here"
                reverse
                icon={<Search />}
              />
            </Box>
            <Grid
              columns={{
                count: 3,
                size: "auto",
              }}
              gap="medium"
            >
              {members
                .filter((d) =>
                  d.name.toLowerCase().includes(search.toLowerCase())
                )
                .slice((page - 1) * 6, page * 6)
                .map((member, i) => {
                  return (
                    <Card key={i} round="xsmall" background="light-2">
                      <CardBody direction="row">
                        <Box width="small" margin="small">
                          <Text
                            size="14px"
                            color="dark-4"
                            margin={{ bottom: "small" }}
                          >
                            {member.occupation}
                          </Text>
                          <Text margin={{ bottom: "small" }} size="16px">
                            {member.name}
                          </Text>
                          <Text
                            margin={{ bottom: "small" }}
                            size="12px"
                            color="dark-2"
                            weight="bold"
                          >
                            Areas of interest:{" "}
                            <Text size="12px" color="dark-3" weight="normal">
                              {member.areas && member.areas.join(", ")}
                            </Text>
                          </Text>
                          <Text size="12px">
                            <Organization size="12px" /> {member.organization}
                          </Text>
                          <Text align="center" size="12px">
                            <Mail size="12px" /> {member.email}
                          </Text>
                        </Box>
                        <Box justify="center" align="center">
                          <Avatar
                            background={"accent-".concat(1 + (i % 4))}
                            size="xlarge"
                            src={member.photo}
                          >
                            <UserManager size="large" />
                          </Avatar>
                        </Box>
                      </CardBody>
                      <CardFooter
                        background="light-3"
                        justify={member.id ? "end" : "center"}
                        pad="small"
                      >
                        {member.id ? (
                          <>
                            {/* <ConfirmButton color="neutral-3" label="Follow" /> */}
                            <Box pad="xsmall" />
                            <ConfirmButton
                              style={{
                                borderRadius: "4px",
                                height: "32px",
                                maxWidth: "120px",
                                padding: "5px",
                              }}
                              color="accent-3"
                              label="View practices"
                              onClick={() => {
                                history.push("/practices", {
                                  author_id: member.id,
                                });
                              }}
                            />
                          </>
                        ) : (
                          <Box align="center">
                            <Text size="14px" color="dark-3">
                              This author has no register.
                            </Text>
                            <Text size="12px" color="dark-4">
                              Ask they to register and add as author.
                            </Text>
                          </Box>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
            </Grid>
          </Card>
          <Footer justify="center">
            <Pagination
              numberMiddlePages={6}
              margin="small"
              onChange={({ page }) => setPage(page)}
              size="small"
              step={6}
              numberItems={
                members.filter((d) =>
                  d.name.toLowerCase().includes(search.toLowerCase())
                ).length
              }
            />
          </Footer>
        </Box>
      </Box>
      <AlertModal errors={errors} setErrors={setErrors} />
    </Box>
  );
};

export default Members;
