import { Box } from "grommet";
import AuthorsField from "../components/AuthorsField";
import SelectField from "../components/SelectField";

const dataSourceOpt = [
  { value: "open_source", label: "Open-Source" },
  { value: "private", label: "Private" },
  { value: "experimental", label: "Experimental" },
  { value: "simulated_data", label: "Simulated Data" },
  { value: "other", label: "Other" },
  { value: "unknown", label: "Unknown" },
];

const contributionOpt = [
  { value: "theory", label: "Theory" },
  { value: "model", label: "Model" },
  { value: "framework", label: "Framework/methods" },
  { value: "guideline", label: "Guideline" },
  { value: "lesson_learning", label: "Lesson Learning" },
  { value: "advice", label: "Advice/implications" },
  { value: "tool", label: "Tool" },
];



const OrganizationForm = (props) => {
  return (
    <Box margin={{ vertical: "small" }}>
      <SelectField
        direction="column"
        required
        options={dataSourceOpt}
        name="data_source"
        label="Data Source"
        placeholder="Select One"
        info="Its a required field."
      />
      <SelectField
        direction="column"
        required
        options={contributionOpt}
        name="contribution_type"
        label="Contribution Type"
        placeholder="Select One"
        info="Its a required field."
      />
      <AuthorsField />
    </Box>
  );
};

export default OrganizationForm;
