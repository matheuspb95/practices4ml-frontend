import { Box, Text, CheckBoxGroup, FormField } from "grommet";

const challengesOpt = [
  { value: "Testing", label: "Testing" },
  { value: "Data Management", label: "Data Management" },
  { value: "Model Development", label: "Model Development" },
  { value: "AI Software Quality", label: "AI Software Quality" },
  { value: "AI Engineering", label: "AI Engineering" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Requirement Engineering", label: "Requirement Engineering" },
  { value: "Project Management", label: "Project Management" },
  { value: "Architecture Design", label: "Architecture Design" },
  { value: "Model deployment", label: "Model deployment" },
  { value: "Education", label: "Education" },
  { value: "Integration", label: "Integration" },
  { value: "Operation Support", label: "Operation Support" },
];

const areasOpt = [
  { value: "Requirements", label: "Requirements" },
  { value: "Design", label: "Design" },
  { value: "Construction", label: "Construction" },
  { value: "Testing", label: "Testing" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Configuration Management", label: "Configuration Management" },
  { value: "Process", label: "Process" },
  { value: "Models and Methods", label: "Models and Methods" },
  { value: "Software Quality", label: "Software Quality" },
  { value: "Professional Practice", label: "Professional Practice" },
];

const CheckBoxGroupField = (props) => {
  return (
    <FormField
      name={props.name}
      contentProps={{ border: false, pad: "0px" }}
      label={
        <Text
          margin={{ vertical: "small", horizontal: "0px" }}
          size="14px"
          weight="bold"
          color="black"
        >
          {props.label}
        </Text>
      }
      component={() => (
        <CheckBoxGroup
          required
          gap="xxsmall"
          style={{ maxHeight: "180px", flexFlow: "column wrap" }}
          labelKey="label"
          name={props.name}
          options={props.options}
        />
      )}
    />
  );
};

const ChallengesForm = (props) => {
  return (
    <Box margin="xxxsmall">
      <CheckBoxGroupField
        name="challenges"
        label="Select the challenges that your practices proposes to minimize"
        options={challengesOpt}
      />
      <CheckBoxGroupField
        name="swebok"
        label="Select the SWEBOK Knowledge areas that your practice meets"
        options={areasOpt}
      />
    </Box>
  );
};

export default ChallengesForm;
