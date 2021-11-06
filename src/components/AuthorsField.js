import React, { useState } from "react";
import { Box, Text, List, TextInput, FormField, Stack, Tip } from "grommet";
import { FormClose, Edit } from "grommet-icons";
import api from "../api";

const AuthorsField = (props) => {
  const [authors, setAuthors] = useState(props.data.authors || []);
  const [authorsSuggestion, setAuthorsSuggestion] = useState([]);

  return (
    <Box>
      <Text
        margin={{ vertical: "small" }}
        size="14px"
        weight="bold"
        color="black"
      >
        Add authors
      </Text>
      <TextInput
        onChange={(v) => {
          const input = v.target.value;
          const searchUsers = async (search) => {
            try {
              const { data } = await api.get(`/users/search?search=${search}`);
              authorsSuggestion.length = 0;
              authorsSuggestion.unshift(...data);
              authorsSuggestion.push({
                author_name: input + " (Add new)",
              });
              setAuthorsSuggestion([...authorsSuggestion]);
            } catch (e) {
              console.log(e);
            }
          };

          if (input) {
            searchUsers(input);
          }
        }}
        onSuggestionSelect={(evt) => {
          const findAuthor = authorsSuggestion.find((a) => {
            return a.author_name === evt.suggestion;
          });
          findAuthor.author_name = findAuthor.author_name.split("(")[0];
          findAuthor.editor = true;

          if (findAuthor) {
            setAuthors([...authors, findAuthor]);
            setAuthorsSuggestion([]);
          } else {
            setAuthors([
              ...authors,
              { author_name: evt.suggestion.split("(")[0] },
            ]);
            setAuthorsSuggestion([]);
          }
        }}
        suggestions={authorsSuggestion.map((a) => a.author_name)}
        labelDirection="column"
        label="Add author"
        info="Its a required field."
      />
      <Box pad={{ vertical: "small" }}>
        <FormField
          name="authors"
          value={authors}
          onChange={() => {}}
          component={() => (
            <List
              onOrder={setAuthors}
              primaryKey={(item) => {
                return (
                  <Box justify="between" direction="row" align="center">
                    <Text size="14px" color="black">
                      {item.author_name}
                    </Text>
                    <Box align="center" direction="row">
                      <Box
                        onClick={() => {
                          item.editor = !item.editor;
                          setAuthors([...authors]);
                        }}
                      >
                        <Tip content="This author can edit practice?">
                          <Stack margin={{ top: "xsmall" }} anchor="center">
                            <Edit size="18px" color="black" />
                            {!item.editor && (
                              <FormClose size="24px" color="status-error" />
                            )}
                          </Stack>
                        </Tip>
                      </Box>
                      <Box
                        onClick={() => {
                          const find = authors.findIndex((a) => a === item);
                          authors.splice(find, 1);
                          if (find !== -1) {
                            setAuthors([...authors]);
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
                  </Box>
                );
              }}
              defaultItemProps={{
                pad: { vertical: "xxxsmall", horizontal: "small" },
                border: "all",
              }}
              data={authors}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default AuthorsField;
