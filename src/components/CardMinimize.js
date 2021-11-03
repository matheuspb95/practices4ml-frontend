import React, { useState } from "react";
import { Box, Card, CardBody, CardHeader } from "grommet";
import { FormAdd, FormSubtract } from "grommet-icons";

const CardMinimize = (props) => {
  const [open, setOpen] = useState(true);
  return (
    <Box fill="horizontal">
      <Card round="xsmall" background="light-1">
        <CardHeader
          onClick={() => setOpen(!open)}
          justify="between"
          height="xxsmall"
          background={props.headerColor || "#17a2b8"}
          pad="small"
        >
          {props.header}
          {open ? <FormSubtract /> : <FormAdd />}
        </CardHeader>
        {open && props.body && <CardBody pad={props.pad || "medium"}>{props.body}</CardBody>}
      </Card>
    </Box>
  );
};

export default CardMinimize;
