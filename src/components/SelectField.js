import React, { useState } from "react";
import { Box, Text, FormField, Select } from "grommet";

const SelectField = (props) => {
  const SelectFilter = (props) => {
    const [value, setValue] = useState([]);
    const [options, setOptions] = useState(props.options);

    const search = () => {
      if (props.searchable) {
        return (text) => {
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
          const exp = new RegExp(escapedText, "i");
          setOptions(props.options.filter((o) => exp.test(o)));
        };
      }
      return undefined;
    };
    return (
      <Select
        {...props}
        valueKey="value"
        labelKey="label"
        onChange={({ value }) => setValue(value)}
        options={options}
        onSearch={search()}
        valueLabel={
          props.searchable &&
          value.length > 0 && (
            <Box pad="xsmall">{value.map((v) => v.value).join(", ")}</Box>
          )
        }
      />
    );
  };

  return (
    <Box direction={props.direction || "row"}>
      <Text
        margin={{ vertical: "xsmall" }}
        size="14px"
        color="dark-1"
        weight="bold"
        style={{ width: "150px" }}
      >
        {props.label}
      </Text>
      <FormField
        {...props}
        info={props.info}
        name={props.name}
        contentProps={{ border: false }}
        component={() => <SelectFilter {...props} />}
      />
    </Box>
  );
};

export default SelectField;
