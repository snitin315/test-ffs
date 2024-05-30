import {
  Heading,
  TextInput,
  TextArea,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Box,
  ModalFooter,
  PlusIcon,
  useToast,
} from "@razorpay/blade/components";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import RuleSetCard from "./RuleSetCard";
import DomainContext from "../../context/DomainContext";

const RuleSet = () => {
  interface RuleSetItem {
    id: string;
    name: string;
    description: string;
  }

  interface RuleSetData {
    name: string;
    description: string;
  }

  const toast = useToast();
  const { domain } = useContext(DomainContext);

  const [isCreateRuleSetOpen, setIsCreateRuleSetOpen] = useState(false);
  const navigate = useNavigate();
  const [ruleSetData, setRuleSetData] = useState<RuleSetData>({
    name: "",
    description: "",
  });
  const [ruleSetList, setRuleSetList] = useState<RuleSetItem[]>([]);

  const handleRuleSetDataChange = (e: any) => {
    const { name, value } = e;

    setRuleSetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://0.0.0.0:8081/v1/ruleset/${domain}/rule_sets`
        );

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          domain!==""?toast.show({ content: "Failed to load Rulesets", color: "negative" }):null;
          return;
        }

        const jsonData = await response.json();
        setRuleSetList(jsonData.rules_set_response_list);
      } catch (error) {
        console.error("Error fetching data:", error);
        domain!==""?toast.show({ content: "Failed to load Rulesets", color: "negative" }):null;
      }
    };
    fetchData();
  }, [domain]);

  const handleRuleSetCreation = async () => {
    try {
      const response = await fetch(
        `http://0.0.0.0:8081/v1/ruleset/${domain}/rule_sets`,
        {
          method: "POST",
          body: JSON.stringify(ruleSetData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        navigate("/rule-set/create", { state: ruleSetData });
        toast.show({
          content: "Rule set created successful",
          color: "positive",
        });
        console.log("Data posted successfully:", responseData);
        setIsCreateRuleSetOpen(false);
        setRuleSetData({ name: "", description: "" });
      } else {
        console.error("Failed to post data:", response.statusText);
        toast.show({ content: "Rule set creation failed", color: "negative" });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.show({ content: "Rule set creation failed", color: "negative" });
    }
  };


  return (
    <>
      {domain === "" ? (
        <Navigate to="/" />
      ) : (
        <>
          <Box display="flex" justifyContent="space-between">
            <Heading size="large">Rule Sets</Heading>
            <Button
              variant="secondary"
              onClick={() => {
                setIsCreateRuleSetOpen(!isCreateRuleSetOpen);
              }}
              marginBottom="spacing.4"
              icon={PlusIcon}
              iconPosition="left"
            >
              Create Rule Set
            </Button>
          </Box>
          <section>
            <Box
              display="grid"
              gridTemplateColumns="auto"
              gap="spacing.4"
              marginTop="spacing.10"
            >
              {ruleSetList.map((item) => {
                return (
                  <RuleSetCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                  />
                );
              })}
            </Box>
            <>
              <Modal
                isOpen={isCreateRuleSetOpen}
                onDismiss={() => setIsCreateRuleSetOpen(false)}
                size="medium"
              >
                <ModalHeader title="Create a rule set" />
                <ModalBody>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="spacing.6"
                    alignSelf="center"
                    width="100%"
                  >
                    <TextInput
                      label="Name"
                      name="name"
                      necessityIndicator="required"
                      isRequired={true}
                      maxCharacters={40}
                      placeholder="Enter the name of rule set"
                      value={ruleSetData.name}
                      onChange={handleRuleSetDataChange}
                    />
                    <TextArea
                      label="Description"
                      name="description"
                      necessityIndicator="required"
                      isRequired={true}
                      maxCharacters={240}
                      placeholder="Write description here"
                      value={ruleSetData.description}
                      onChange={handleRuleSetDataChange}
                    />
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Box
                    display="flex"
                    gap="spacing.3"
                    justifyContent="flex-end"
                    width="100%"
                  >
                    <Button
                      variant="secondary"
                      onClick={() => setIsCreateRuleSetOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      isDisabled={(ruleSetData.name.length===0 || ruleSetData.description.length===0)}
                      onClick={() => {
                        handleRuleSetCreation();
                      }}
                    >
                      Create
                    </Button>
                  </Box>
                </ModalFooter>
              </Modal>
            </>
          </section>
        </>
      )}
    </>
  );
};

export default RuleSet;
