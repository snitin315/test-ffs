import {
  Dropdown,
  DropdownOverlay,
  ActionList,
  ActionListItem,
  Box,
  DropdownButton,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
  TextArea,
  useToast,
  DropdownHeader,
  DropdownFooter,
  PlusIcon,
  Tooltip,
  TooltipInteractiveWrapper,
  InfoIcon,
} from "@razorpay/blade/components";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DomainContext from "../../context/DomainContext";

const Domain = () => {
  interface DomainItem {
    created_at: string;
    description: string;
    id: string;
    name: string;
    updated_at: string;
  }

  const navigate = useNavigate();
  const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
  const [isAddDomainOpen, seIsAddDomainOpen] = useState(false);
  const [domainData, setDomainData] = useState({ name: "", description: "" });
  const [domainList, setDomainList] = useState<DomainItem[]>([]);
  const toast = useToast();
  const {
    setDomain,
    domainCreated,
    setDomainCreated,
    domainStatus,
    setDomainStatus,
  } = useContext(DomainContext);

  const handleAddDomainButtonClick = () => {
    seIsAddDomainOpen(!isAddDomainOpen);
  };

  const handleDomainDataChange = (e: any) => {
    const { name, value } = e;

    setDomainData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://0.0.0.0:8081/v1/domain");

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          toast.show({ content: "Failed to load Domains", color: "negative" });
          return;
        }

        const jsonData = await response.json();
        setDomainList(jsonData.domains);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.show({ content: "Failed to load Domains", color: "negative" });
      }
    };
    fetchData();
  }, [domainCreated]);

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
        seIsAddDomainOpen(false);
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
      <Box>
        <Dropdown
          onOpenChange={() => {
            setIsDomainDropdownOpen(false);
          }}
        >
          <DropdownButton
            isFullWidth
            variant="tertiary"
            color="primary"
            onClick={() => setIsDomainDropdownOpen(!isDomainDropdownOpen)}
          >
            {domainStatus.length > 0 ? domainStatus : "Domain"}
          </DropdownButton>

          <DropdownOverlay>
            <DropdownHeader title="Domain List" />
            <ActionList>
              {domainList.map((item) => {
                return (
                  <ActionListItem
                    key={item.id}
                    title={item.name}
                    value={item.name}
                    href=""
                    target=""
                    onClick={() => {
                      setDomainStatus(item.name);
                      navigate("/rule-sets");
                      setDomain(item.id);
                    }}
                  />
                );
              })}
            </ActionList>
            <DropdownFooter>
              <Button
                isFullWidth
                icon={PlusIcon}
                onClick={handleAddDomainButtonClick}
              >
                Add domain
              </Button>
            </DropdownFooter>
          </DropdownOverlay>
        </Dropdown>
      </Box>

      {/* Modal */}

      <Modal
        isOpen={isAddDomainOpen}
        onDismiss={() => seIsAddDomainOpen(false)}
        size="medium"
      >
        <ModalHeader
          title="Create a new domain"
          titleSuffix={
            <Tooltip
              placement="top"
              content="Domain represents a top-level entity that encapsulate a set of rulesets and rules."
              onOpenChange={function noRefCheck() {}}
            >
              <TooltipInteractiveWrapper>
                <InfoIcon marginTop="spacing.2" size="medium" />
              </TooltipInteractiveWrapper>
            </Tooltip>
          }
        />

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
              placeholder="Enter domain name"
              value={domainData.name}
              onChange={handleDomainDataChange}
              necessityIndicator="required"
              // validationState={errors.name ? "error" : "none"}
              // errorText={errors.name}
              maxCharacters={40}
              isRequired={true}
            />
            <TextArea
              label="Description"
              name="description"
              placeholder="Write description here"
              value={domainData.description}
              onChange={handleDomainDataChange}
              necessityIndicator="required"
              // validationState={errors.description ? "error" : "none"}
              // errorText={errors.description}
              maxCharacters={240}
              isRequired={true}
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
              onClick={() => seIsAddDomainOpen(false)}
            >
              Cancel
            </Button>
            <Button
              isDisabled={
                domainData.name.length === 0 ||
                domainData.description.length === 0
              }
              type="submit"
              onClick={() => {
                handleDomainCreation();
              }}
            >
              Create
            </Button>
          </Box>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Domain;
