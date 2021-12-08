import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Card,
  CardBody,
  Grid,
  CardHeader,
  Chart,
  Stack,
  Meter,
} from "grommet";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import CardMinimize from "../components/CardMinimize";
import api from "../api";

const PieChart = ({ data, max }) => {
  const colors = [
    "accent-1",
    "accent-2",
    "accent-3",
    "accent-4",
    "neutral-1",
    "neutral-2",
    "neutral-3",
    "neutral-4",
    "status-error",
    "status-warning",
    "status-ok",
    "brand",
    "#654321",
    "#987654",
    "#135790",
    "#aaff44",
  ];
  const [dropValue, setDropValue] = useState(0);
  const [dropLabel, setDropLabel] = useState("");
  const [showDrop, setShowDrop] = useState(false);

  return (
    <Box>
      <Box
        pad={{ bottom: "medium" }}
        justify="center"
        gap="small"
        direction="row-responsive"
        wrap
      >
        {data.map((value, i) => {
          return (
            <Box align="center" gap="xxsmall" direction="row">
              <Box width="25px" height="10px" background={colors[i]} />{" "}
              {value.label}
            </Box>
          );
        })}
      </Box>
      <Box align="center">
        <Stack anchor="center">
          <Meter
            thickness="large"
            size="small"
            type="circle"
            background="light-2"
            values={data.map((value, i) => {
              return {
                value: value.value,
                label: value.label,
                color: colors[i],
                onHover: (v) => {
                  setShowDrop(v);
                  setDropValue(value.value);
                  setDropLabel(value.label);
                },
              };
            })}
          />
          {showDrop && (
            <Box align="center" pad={{ bottom: "xsmall" }}>
              <Text size="xlarge" weight="bold">
                {dropValue}
              </Text>
              <Text size="xsmall" textAlign="center">
                {dropLabel}
              </Text>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

const LabelChart = ({ data, max }) => {
  return (
    <Box height="250px">
      <Stack>
        <Box
          pad={{ vertical: "xxsmall", horizontal: "0" }}
          direction="column"
          height="small"
          justify="between"
        >
          {[1, 0.75, 0.5, 0.25, 0].map((v) => (
            <Box direction="row" align="center">
              <Text size="12px">{max * v}</Text>
              <Box
                overflow="visible"
                margin="xsmall"
                height="1px"
                width="large"
                background="dark-1"
              />
            </Box>
          ))}
        </Box>
        <Box pad={{ left: "medium" }} direction="row">
          {data.map((v) => (
            <Box flex={false} basis="45px" align="end" gap="medium">
              <Chart
                bounds={[
                  [0, 2],
                  [0, max],
                ]}
                type="bar"
                values={[{ value: [1, v.value], label: v.value }]}
                color="accent-1"
                size={{ height: "small", width: "xxsmall" }}
              />
              <Text style={{ transform: "rotate(-60deg)" }} size="12px">
                {v.label}
              </Text>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

const Home = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [areasLikes, setAreasLikes] = useState([]);
  const [areasViews, setAreasViews] = useState([]);
  const [areascomments, setAreasComments] = useState([]);
  const [challengesLikes, setChallengesLikes] = useState([]);
  const [challengesViews, setChallengesViews] = useState([]);
  const [challengescomments, setChallengesComments] = useState([]);

  const maxValue = (values) => {
    let max = 0;
    values.forEach((element) => {
      if (element["value"] > max) {
        max = element["value"];
      }
    });

    return max;
  };

  useEffect(() => {
    ["areas", "challenges"].forEach((a) => {
      ["likes", "views", "comments"].forEach((b) => {
        (async () => {
          const token = localStorage.getItem("token");
          try {
            const { data } = await api.get(`/${a}/${b}`, {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            switch (a) {
              case "areas":
                if (b === "likes") {
                  setAreasLikes(data);
                }
                if (b === "views") {
                  setAreasViews(data);
                }
                if (b === "comments") {
                  setAreasComments(data);
                }
                break;
              case "challenges":
                if (b === "likes") {
                  setChallengesLikes(data);
                }
                if (b === "views") {
                  setChallengesViews(data);
                }
                if (b === "comments") {
                  setChallengesComments(data);
                }
                break;
              default:
                break;
            }
          } catch (e) {}
        })();
      });
    });
  }, []);

  return (
    <Box direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box pad="medium" fill background="light-3">
          <Text size="28px" color="black">
            SEPractices4ML
          </Text>
          <Text size="18px">
            Software Engineering Practices Portal to assist in developing ML
            systems
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
              <Text>Presentation</Text>
            </CardHeader>
            <CardBody pad="medium">
              <Text>
                In this portal, we present some practices applied in the
                software industry and focused on the development of ML systems
                We present a dashboard with the main indicators on the practices
                of this portal.
              </Text>
            </CardBody>
          </Card>
          <Grid
            columns={{
              count: 2,
              size: "auto",
            }}
            gap="medium"
          >
            <CardMinimize
              header="Most Viewed (by areas)"
              body={<LabelChart data={areasViews} max={maxValue(areasViews)} />}
            />
            <CardMinimize
              header="Most Commented (by areas)"
              body={
                <LabelChart
                  data={areascomments}
                  max={maxValue(areascomments)}
                />
              }
            />
            <CardMinimize
              header="Most Liked (by areas)"
              body={<PieChart data={areasLikes} max={maxValue(areasLikes)} />}
            />
            <CardMinimize
              header="Most Liked (by challenges)"
              body={
                <PieChart
                  data={challengesLikes}
                  max={maxValue(challengesLikes)}
                />
              }
            />
            <CardMinimize
              header="Most Commented (by challenges)"
              body={
                <PieChart
                  data={challengescomments}
                  max={maxValue(challengescomments)}
                />
              }
            />
            <CardMinimize
              header="Most viewed (by challenges)"
              body={
                <PieChart
                  data={challengesViews}
                  max={maxValue(challengesViews)}
                />
              }
            />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
