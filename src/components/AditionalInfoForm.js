import React, { useState } from "react";
import { Box, FileInput, List, Text, FormField } from "grommet";
import InputField from "./InputField";
import { FormClose } from "grommet-icons";

const UploadFiles = (props) => {
  const [files, setFiles] = useState(props.files || []);
  return (
    <Box>
      <Text
        Text
        margin={{ vertical: "small" }}
        size="14px"
        weight="bold"
        color="black"
      >
        Files
      </Text>
      <FileInput
        onChange={(event) => {
          const fileList = event.target.files;
          if (fileList) {
            for (let i = 0; i < fileList.length; i += 1) {
              const file = fileList[i];
              if (
                file.type === "application/pdf" ||
                file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/png"
              ) {
                if (file.size < 3000000) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFiles([
                      ...files,
                      { filename: file.name, filedata: reader.result },
                    ]);
                  };
                  reader.readAsDataURL(file);
                }
              }
            }
          }
        }}
      />
      <FormField
        name="files"
        value={files}
        onChange={() => {}}
        component={() => (
          <List
            primaryKey={(item) => {
              return (
                <Box direction="row" align="center">
                  <Text size="14px" color="black">
                    {item.filename}
                  </Text>
                  <Box
                    onClick={() => {
                      const find = files.findIndex((a) => a === item);
                      files.splice(find, 1);
                      if (find !== -1) {
                        setFiles([...files]);
                      }
                    }}
                    margin="xsmall"
                    round
                    direction="row"
                    background="black"
                  >
                    <FormClose size="18px" color="white" />
                  </Box>
                </Box>
              );
            }}
            defaultItemProps={{
              pad: { vertical: "xxxsmall", horizontal: "small" },
              border: "all",
            }}
            data={files}
          />
        )}
      />
    </Box>
  );
};

const AdditionalInfo = (props) => {
  return (
    <Box margin="xxxsmall">
      <UploadFiles files={props.data.files} />
      <InputField
        defaultValue={props.data.reference}
        required={!props.data.reference}
        labelDirection="column"
        name="reference"
        label="Reference"
        info="Its a required field."
      />
      <InputField
        defaultValue={props.data.link}
        required={!props.data.link}
        labelDirection="column"
        name="link"
        label="Link"
        info="Its a required field."
      />
      <InputField
        defaultValue={props.data.doi}
        required={!props.data.doi}
        labelDirection="column"
        name="doi"
        label="DOI"
        info="Its a required field."
      />
    </Box>
  );
};

export default AdditionalInfo;
