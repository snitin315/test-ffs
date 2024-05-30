import {
  Button,
  Box,
  TextInput,
  TextArea,
  useToast,
  Heading,
} from "@razorpay/blade/components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DomainContext from "../../context/DomainContext";

const DomainForm = () => {
  const navigate = useNavigate();
  const [domainData, setDomainData] = useState({ name: "", description: "" });
  const toast = useToast();
  const { setDomain, domainCreated, setDomainCreated, setDomainStatus } =
    useContext(DomainContext);

  const handleDomainDataChange = (e: any) => {
    const { name, value } = e;

    setDomainData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDomainCreation = async () => {
    try {
      const response = await fetch("http://0.0.0.0:8081/v1/domain", {
        method: "POST",
        body: JSON.stringify(domainData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setDomain(responseData.id);
        setDomainStatus(responseData.name);
        navigate("/rule-sets");
        toast.show({ content: "Domain created successful", color: "positive" });
        setDomainData({ name: "", description: "" });
        setDomainCreated(!domainCreated);
      } else {
        console.error("Failed to post data:", response.statusText);
        toast.show({
          content: "Domain creation failed",
          color: "negative",
          autoDismiss: false,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.show({
        content: "Domain creation failed",
        color: "negative",
        autoDismiss: false,
      });
    }
  };

  return (
    <>
      <Box
        width="70%"
        display="flex"
        flexDirection="column"
        gap="spacing.10"
        backgroundColor="surface.background.gray.intense"
        paddingX="spacing.8"
        paddingY="spacing.11"
        borderRadius="large"
        elevation="midRaised"
      >
        <Heading>Create a domain to get started</Heading>
        <Box display="flex" flexDirection="column" gap="spacing.6">
          <TextInput
            label="Name"
            name="name"
            placeholder="Enter domain name"
            value={domainData.name}
            onChange={handleDomainDataChange}
            necessityIndicator="required"
            isRequired
            maxCharacters={40}
          />
          <TextArea
            label="Description"
            name="description"
            placeholder="Write description here"
            value={domainData.description}
            onChange={handleDomainDataChange}
            necessityIndicator="required"
            isRequired
            maxCharacters={240}
          />
        </Box>
        <Button
          size="medium"
          isDisabled={
            domainData.name.length === 0 || domainData.description.length === 0
          }
          onClick={() => {
            handleDomainCreation();
          }}
        >
          Create
        </Button>
      </Box>
    </>
  );
};

export default DomainForm;
