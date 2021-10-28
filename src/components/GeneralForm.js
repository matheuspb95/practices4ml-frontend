import { Box, Text } from "grommet";
import SelectField from "../components/SelectField";
import InputField from "./InputField";

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
      <InputField
        required
        labelDirection="column"
        name="name"
        label="Practice Name"
        info="Its a required field."
      />
      <InputField
        required
        textArea
        name="description"
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
          name="organization_type"
          label="Organization Types"
          placeholder="Select One"
          info="Its a required field."
        />
        <SelectField
          direction="column"
          required
          options={devProccessOpt}
          name="dev_process"
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
    </Box>
  );
};

export default GeneralForm;
