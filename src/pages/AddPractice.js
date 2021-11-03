import React, { useEffect, useState } from "react";
import { Box, Text, Form } from "grommet";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ConfirmButton from "../components/ConfirmButton";
import OrganizationForm from "../components/OrganizationForm";
import GeneralForm from "../components/GeneralForm";
import ChallengesForm from "../components/ChallengesForm";
import CardMinimize from "../components/CardMinimize";
import AdditionalInfo from "../components/AditionalInfoForm";
import api from "../api";
import AlertModal from "../components/AlertModal";

const AddPractice = () => {
  let location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(location.state || {});
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (step === 3) {
      formData["context"] = formData["context"]["label"];
      formData["contribution_type"] = formData["contribution_type"]["label"];
      formData["data_source"] = formData["data_source"]["label"];
      formData["development_process"] =
        formData["development_process"]["label"];
      formData["organization_type"] = formData["organization_type"]["label"];

      const postData = async (form) => {
        const token = localStorage.getItem("token");
        if (formData.id) {
          try {
            const res = await api.put("/practices", form, {
              params: {
                practice_id: formData.id,
              },
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (res.status === 200) {
              setSuccess(true);
              setTimeout(() => {
                history.push("/practices");
              }, 500);
            }
          } catch (e) {
            setStep(1);
            setErrors([e.toString()]);
            console.log(e);
          }
        } else {
          try {
            const res = await api.post("/practices", form, {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (res.status === 200) {
              setSuccess(true);
              setTimeout(() => {
                history.push("/");
              }, 500);
            }
          } catch (e) {
            setStep(1);
            setErrors([e.toString()]);
            console.log(e);
          }
        }
      };
      postData(formData);
    }
  }, [step, formData, history]);

  return (
    <Box direction="row">
      {showSidebar && <SideBar />}
      <Box fill>
        <Header changeSideBarState={() => setShowSidebar(!showSidebar)} />
        <Box gap="medium" pad="small" fill background="light-3">
          <Text size="22px">Practice Add</Text>
          {step === 1 && (
            <Form
              onSubmit={(evt) => {
                setFormData({ ...formData, ...evt.value });
                setStep(2);
              }}
            >
              <Box>
                <Box direction="row" gap="small">
                  <CardMinimize
                    header="General"
                    body={<GeneralForm data={formData} />}
                  />
                  <CardMinimize
                    header="Organization context of the AI/ML system development"
                    body={<OrganizationForm data={formData} />}
                  />
                </Box>
                <Box
                  pad={{ vertical: "medium" }}
                  direction="row"
                  justify="between"
                >
                  <ConfirmButton
                    color="dark-3"
                    label="Cancel"
                    onClick={() => {
                      setStep(1);
                    }}
                  />
                  <ConfirmButton color="neutral-1" label="Next" type="submit" />
                </Box>
              </Box>
            </Form>
          )}
          {step === 2 && (
            <Form
              onSubmit={(evt) => {
                setStep(3);
                setFormData({ ...formData, ...evt.value });
              }}
            >
              <Box>
                <Box direction="row" gap="small">
                  <CardMinimize
                    header="Challenges and SE knowledge areas"
                    body={<ChallengesForm data={formData} />}
                  />
                  <CardMinimize
                    headerColor="dark-3"
                    header="Additional information"
                    body={<AdditionalInfo data={formData} />}
                  />
                </Box>
                <Box
                  pad={{ vertical: "medium" }}
                  direction="row"
                  justify="between"
                >
                  <ConfirmButton
                    color="dark-3"
                    label="Previous"
                    onClick={() => {
                      setStep(1);
                    }}
                  />
                  <ConfirmButton color="neutral-1" label="Save" type="submit" />
                </Box>
              </Box>
            </Form>
          )}
        </Box>
      </Box>
      <AlertModal
        errors={errors}
        setErrors={setErrors}
        success={success}
        successText="PRACTICE SAVED"
      />
    </Box>
  );
};

export default AddPractice;
