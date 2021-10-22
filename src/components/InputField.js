import React from "react";
import { Box, Text, TextInput, FormField, Tip } from "grommet";

const InputField = (props) => {
  const icon = (
    <>
      {props.icon && (
        <div
          style={{
            position: "absolute",
            width: "inherit",
            display: "flex",
            justify: "center",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            right: "-10px",
            borderRadius: "0px 3px 3px 0px",
            borderLeft: "1px solid grey",
            backgroundColor: "#e9ecef",
            padding: "10px",
          }}
        >
          {<props.icon size="18px" color="dark-1" />}
        </div>
      )}
    </>
  );

  if (props.tip) {
    return (
      <Tip
        dropProps={{
          align: { top: "top", left: "right" },
          width: "80px",
          margin: { left: "20px" },
        }}
        content={props.tip}
      >
        <FormField
          contentProps={{ border: false }}
          component={() => (
            <TextInput
              value={props.value}
              label={props.label}
              type={props.type}
              name={props.name}
              id={props.name}
              icon={icon}
              reverse={true}
              size="small"
              placeholder={props.placeholder}
            />
          )}
          value={props.value}
          id={props.name}
          htmlFor={props.name}
          {...props}
          label=""
        />
      </Tip>
    );
  }
  return (
    <Box direction="row">
      {props.label && (
        <Text
          margin={{ top: "small" }}
          size="14px"
          color="dark-1"
          weight="bold"
          style={{ width: "150px" }}
        >
          {props.label}
        </Text>
      )}
      <FormField
        contentProps={{ border: false, width: "medium" }}
        component={() => (
          <TextInput
            type={props.type}
            name={props.name}
            id={props.name}
            icon={icon}
            reverse={true}
            size="small"
            placeholder={props.placeholder}
            {...props}
          />
        )}
        id={props.name}
        htmlFor={props.name}
        {...props}
        label=""
      />
    </Box>
  );
};

export default InputField;
