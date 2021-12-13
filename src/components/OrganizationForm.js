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
  props.data.data_source = props.data.data_source?.label;
  props.data.contribution_type = props.data.contribution_type?.label;
  return (
    <Box margin={{ vertical: "small" }}>
      <SelectField
        direction="column"
        required={!props.data.data_source}
        options={dataSourceOpt}
        name="data_source"
        label="Data Source"
        placeholder={props.data.data_source || "Select One..."}
        info="Its a required field."
      />
      <SelectField
        direction="column"
        required={!props.data.contribution_type}
        options={contributionOpt}
        name="contribution_type"
        label="Contribution Type"
        placeholder={props.data.contribution_type || "Select One..."}
        info="Its a required field."
      />
      <AuthorsField data={props.data} />
    </Box>
  );
};

export default OrganizationForm;
