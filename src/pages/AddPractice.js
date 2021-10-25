import React, { useState } from "react";
import { Box, Text, Card, CardBody, CardHeader, Form } from "grommet";
import { FormAdd, FormSubtract } from "grommet-icons";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

const organizationTypeOpt = [
  { value: "large_company", label: "Large company" },
  { value: "small_company", label: "Small Company/Startup" },
  { value: "academic", label: "Lab case/Academic" },
  { value: "other", label: "Other" },
  { value: "unknown", label: "Unknown" },
];

const devProccessOpt = [
  { value: "research_based", label: "Research-based" },
  { value: "ad_hoc", label: "Ad-hoc" },
  { value: "agile", label: "Agile" },
  { value: "iterative", label: "Iterative" },
  { value: "waterfall", label: "Waterfall" },
  { value: "mix", label: "Mix" },
  { value: "other", label: "Other" },
  { value: "unknown", label: "Unknown" },
];

const contextOpt = [
  { value: "in_house", label: "In-house" },
  { value: "outsource", label: "Outsource" },
  { value: "other", label: "Other" },
  { value: "unkwon", label: "Unknown" },
];

const GeneralForm = (props) => {
  return (
    <Box>
      <Form onSubmit={() => {}}>
        <InputField
          labelDirection="column"
          name="name"
          label="Practice Name"
          info="Its a required field."
        />
        <InputField
          textArea
          labelDirection="column"
          label="Practice Description"
          info="Its a required field."
        />
        <Text
          color="black"
          size="16px"
          weight="bold"
          style={{ textDecoration: "underline" }}
        >
          Inform the context in which the practice was developed
        </Text>
        <Box margin={{ vertical: "small" }}>
          <SelectField
            direction="column"
            required
            options={organizationTypeOpt}
            name="organization-type"
            label="Organization Types"
            placeholder="Select One"
            info="Its a required field."
          />
          <SelectField
            direction="column"
            required
            options={devProccessOpt}
            name="dev-process"
            label="Development Process"
            placeholder="Select One"
            info="Its a required field."
          />
          <SelectField
            direction="column"
            required
            options={contextOpt}
            name="context"
            label="Context"
            placeholder="Select One"
            info="Its a required field."
          />
        </Box>
      </Form>
    </Box>
  );
};

const CardMinimize = (props) => {
  const [open, setOpen] = useState(true);
  return (
    <Box fill="horizontal">
      <Card round="xsmall" background="light-1">
        <CardHeader
          onClick={() => setOpen(!open)}
          justify="between"
          height="xxsmall"
          background="#17a2b8"
          pad="small"
        >
          {props.header}
          {open ? <FormSubtract /> : <FormAdd />}
        </CardHeader>
        {open && props.body && <CardBody pad="medium">{props.body}</CardBody>}
      </Card>
    </Box>
  );
};

const AddPractice = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Box direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box gap="medium" pad="small" fill background="light-3">
          <Text size="22px">Practice Add</Text>
          <Box direction="row" gap="small">
            <CardMinimize header="General" body={<GeneralForm />} />
            <CardMinimize header="Organization context of the AI/ML system development" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPractice;
