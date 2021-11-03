import React, { useState } from "react";
import {
  Box,
  Text,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormField,
  CheckBoxGroup,
  CheckBox,
} from "grommet";

import ConfirmButton from "../components/ConfirmButton";
import InputField from "../components/InputField";
import Link from "../components/Link";
import SelectField from "../components/SelectField";
import api from "../api";
import { useHistory } from "react-router-dom";

const degreeOpt = [
  { label: "Student", value: "student" },
  { label: "Graduate", value: "graduate" },
  { label: "Specialist", value: "specialist" },
  { label: "Master", value: "master" },
  { label: "PHD", value: "phd" },
  { label: "Other", value: "other" },
];

const areaOpt = [
  { label: "Software Engineering", value: "software engineering" },
  { label: "Human Computer Interaction", value: "human computer interaction" },
  { label: "Interaction Design", value: "interaction design" },
  { label: "Artificial Intelligence", value: "artificial intelligence" },
  { label: "Machine Learning", value: "machine learning" },
  { label: "Neural Networks", value: "neural networks" },
  { label: "Deep Learning", value: "deep learning" },
  { label: "Data Mining", value: "data mining" },
  { label: "Data Science", value: "data science" },
  { label: "Big Data", value: "big data" },
  { label: "Computer Vision", value: "computer vision" },
  { label: "Software Architecture", value: "software architecture" },
];

const ProfileForm = (props) => {
  const history = useHistory();

  const submitData = async ({ value }) => {
    if (value.areas) value.areas = value.areas.map((v) => v.value);
    if (value.degree) value.degree = value.degree.value;

    const form = { ...props.userData, ...value };
    const token = localStorage.getItem("token");

    try {
      await api.put("/users", form, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      props.setSuccess(true);
      setTimeout(() => {
        props.setSuccess(false);
        history.push("/")
      }, 500);
    } catch (e) {
      console.log(e);
      props.setErrors(["Error on update user"]);
    }
  };

  const WorkCheckbox = () => {
    const [value, setValue] = useState(props.userData.work);
    return (
      <CheckBoxGroup
        value={value}
        onChange={({value}) => setValue(value)}
        name="work"
        direction="row"
        options={[
          { label: "Academic", value: "academic" },
          {
            label: "Industry Software (Startup/ Small /Large Company)",
            value: "industry"
          },
        ]}
      />
    );
  };

  return (
    <Card
      overflow={{ vertical: "visible" }}
      margin={{ vertical: "medium", horizontal: "small" }}
      fill
      round="xsmall"
      background="white"
    >
      <CardHeader
        border={[
          {
            color: "light-3",
            size: "small",
            side: "bottom",
          },
        ]}
        pad="small"
        justify="start"
        direction="row"
      >
        <ConfirmButton color="#007bff" label="About Me" />
        <Button color="dark-3" label="Settings" plain />
      </CardHeader>
      <CardBody
        pad="small"
        margin={{ bottom: "medium" }}
        justify="start"
        direction="row"
      >
        <Form onSubmit={submitData}>
          <InputField
            defaultValue={props.userData.name}
            name="name"
            label="Name"
            placeholder={props.userData.name || "Name"}
            info="Your name appears on your Profile page, as your byline, and in your responses. It is a required field."
          />
          <InputField
            // disabled
            label="Email"
            value={props.userData.email}
            placeholder={props.userData.email || "Email"}
            info="Your email appears on your Profile page and will use as your login. It is a required field."
          />
          <FormField name="work" contentProps={{ border: false }}>
            <Box direction="row">
              <Text
                margin={{ top: "small" }}
                size="14px"
                color="dark-1"
                weight="bold"
                style={{ minWidth: "156px" }}
              >
                Currently work?
              </Text>
              <WorkCheckbox />
            </Box>
          </FormField>
          <InputField
            defaultValue={props.userData.organization}
            name="organization"
            label="Organization*"
            placeholder={props.userData.organization || "Your organization"}
            info="Your Organization appears on your Profile page. It is a required field."
          />
          <InputField
            defaultValue={props.userData.occupation}
            name="occupation"
            label="Occupation*"
            placeholder={props.userData.occupation || "Your Role"}
            info="Your Occupation appears on your Profile page. It is a required field."
          />
          <SelectField
            required={!props.userData.degree}
            options={degreeOpt}
            name="degree"
            label="Degree*"
            placeholder={props.userData.degree || "Select One..."}
          />
          <SelectField
            required={!props.userData.areas}
            options={areaOpt}
            multiple
            searchable
            name="areas"
            label="Areas of interest*"
            placeholder={
              props.userData.areas
                ? props.userData.areas.join(", ")
                : "Select One..."
            }
            info="You can add more than one interest area. It is a required field"
          />
          <Box gap="medium" margin={{ left: "156px" }}>
            <Box align="center" gap="xsmall" direction="row">
              <CheckBox name="reviewer" />
              <Text size="20" weight="bold">
                Do you want to be a reviewer? <Link label="see more" />
              </Text>
            </Box>
            <Box align="center" gap="xsmall" direction="row">
              <CheckBox name="agree" />
              <Text size="20" weight="bold">
                I agree with the <Link label="terms and conditions" />
              </Text>
            </Box>
            <Box width="xsmall" margin={{ vertical: "small" }}>
              <ConfirmButton
                type="submit"
                color="status-error"
                label="submit"
              />
            </Box>
          </Box>
        </Form>
      </CardBody>
    </Card>
  );
};

export default ProfileForm;
