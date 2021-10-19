import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Text,
  TextInput,
  CheckBox,
  Button,
  Form,
  FormField,
  Heading,
  Tip,
  Layer,
} from "grommet";
import { User, MailOption, Lock } from "grommet-icons";
import api from "../api";

const InputField = (props) => {
  const icon = (
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
              type={props.type}
              name={props.name}
              id={props.name}
              icon={icon}
              reverse={true}
              size="small"
              placeholder={props.placeholder}
            />
          )}
          id={props.name}
          htmlFor={props.name}
          {...props}
        />
      </Tip>
    );
  }
  return (
    <FormField
      contentProps={{ border: false }}
      component={() => (
        <TextInput
          type={props.type}
          name={props.name}
          id={props.name}
          icon={icon}
          reverse={true}
          size="small"
          placeholder={props.placeholder}
        />
      )}
      id={props.name}
      htmlFor={props.name}
      {...props}
    />
  );
};

const ConfirmButton = (props) => {
  return (
    <Button
      type="submit"
      size="small"
      style={{ borderRadius: "4px" }}
      primary
      color={props.color}
      label={props.label}
    />
  );
};

const Link = (props) => {
  return <Button alignSelf="start" color="#007bff" label={props.label} plain />;
};

const fields = [
  {
    name: "name",
    messageError: "Name not valid",
    placeholder: "Full Name",
    regex: /([a-zA-Z]+\s*)+/g,
    icon: User,
  },
  {
    name: "email",
    messageError: "Email not valid",
    placeholder: "Email",
    regex: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/g,
    icon: MailOption,
  },
  {
    name: "password",
    messageError: "Password not valid",
    placeholder: "Password",
    type: "password",
    tip: "The password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, at least one special character ([!@#$%^&*.]).",
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&.*])(?=.{8,})/g,
    icon: Lock,
  },
  {
    name: "confirm-password",
    messageError: "Password not valid",
    placeholder: "Confirm Password",
    type: "password",
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&.*])(?=.{8,})/g,
    icon: Lock,
  },
];

const goLogin = () => {
  console.log('go login');
}

const Home = () => {
  const refAgree = useRef();

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  return (
    <Box
      align="center"
      justify="center"
      background="#e9ecef"
      fill
      direction="row"
    >
      <Card width="360px" round="xsmall" background="light-1">
        <CardHeader
          height="80px"
          border={[
            {
              color: "blue",
              size: "3px",
              style: "solid",
              side: "top",
            },
            {
              color: "light-4",
              size: "xsmall",
              style: "solid",
              side: "bottom",
            },
          ]}
          pad={{ horizontal: "medium", vertical: "xxxsmall" }}
          justify="center"
        >
          <Heading level="2">
            SEPractices
            <Text weight="normal" size="36px">
              4ML
            </Text>
          </Heading>
        </CardHeader>
        <CardBody gap="medium" align="center" pad="medium">
          <Text size="16px">Register a new membership</Text>
          <Form
            onSubmit={async ({ value }) => {
              fields.forEach((field) => {
                if (!field.regex.test(value[field.name])) {
                  errors.push(field.messageError);
                }
              });
              if (!refAgree.current.checked) {
                errors.push("Agree with the terms and conditions");
              }
              if (value["password"] !== value["confirm-password"]) {
                errors.push("Passwords doesnt match");
              }
              setErrors([...errors]);
              if (errors.length === 0) {
                try {
                  const { data } = await api.post("/users", value);
                  setSuccess(true);
                } catch (e) {
                  errors.push("Network Error", e);
                }
              }
            }}
            style={{ width: "-webkit-fill-available" }}
          >
            {fields.map((f) => {
              return <InputField key={f.name} id={f.name} {...f} />;
            })}
            <Box justify="between" direction="row" align="center">
              <Box align="center" gap="xsmall" direction="row">
                <CheckBox ref={refAgree} />
                <Text size="20" weight="bold">
                  I agree to the <Link label="terms" />
                </Text>
              </Box>
              <ConfirmButton color="#007bff" label="Register" />
            </Box>
          </Form>
          <Link label="I already have a membership" />
        </CardBody>
      </Card>
      {errors.length > 0 && (
        <Layer onEsc={() => setErrors([])} onClickOutside={() => setErrors([])}>
          <Box pad="medium">
            <Heading color="status-error">ERRORS</Heading>
            {errors.map((error) => {
              return <Text>{error}</Text>;
            })}
            <Button label="close" onClick={() => setErrors([])} />
          </Box>
        </Layer>
      )}
      {success && (
        <Layer onEsc={goLogin} onClickOutside={goLogin}>
          <Box pad="medium">
            <Heading color="status-ok">SUCCESS</Heading>
              <Text>Do login to continue</Text>
            <Button label="close" onClick={goLogin} />
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default Home;
