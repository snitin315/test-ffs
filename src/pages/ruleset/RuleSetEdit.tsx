import { Heading, Box, Button, Text } from "@razorpay/blade/components";
import RuleSetEditCard from "./RuleSetEditCard";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RuleSetEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationData = location.state;
  const boxRef = useRef<HTMLDivElement>(null);

  const rule = {
    rule: "",
    score: "",
    state: false,
  };

  const [rules, setRules] = useState([rule]);

  useEffect(() => {
    scrollToBottom();
  }, [rules]);

  const scrollToBottom = () => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          display="flex"
          flexDirection="row"
          width="90%"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column">
            <Heading size="large">{navigationData.name}</Heading>
            <Text color="surface.text.gray.subtle" size="medium">
              {navigationData.description}
            </Text>
          </Box>
          <Button
            variant="primary"
            color="primary"
            marginBottom="spacing.4"
            onClick={() => {
              navigate("/rule-sets");
            }}
          >
            Save
          </Button>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          width="90%"
          marginTop="spacing.9"
        >
          <Box
            display="flex"
            borderColor="surface.border.gray.muted"
            borderWidth="thin"
            borderBottomWidth="none"
            paddingX="spacing.4"
            paddingY="spacing.2"
            backgroundColor="surface.background.gray.subtle"
            gap="spacing.6"
          >
            <Box flex="4" paddingY="spacing.3">
              <Text size="medium">Rules</Text>
            </Box>
            <Box flex="2" paddingY="spacing.3">
              <Text size="medium">Score</Text>
            </Box>
            <Box flex="1" paddingY="spacing.3">
              <Text size="medium">State</Text>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap="spacing.4"
            height="250px"
            width="100%"
            overflowY="auto"
            padding="spacing.4"
            borderColor="surface.border.gray.muted"
            borderWidth="thin"
            ref={boxRef}
          >
            {rules.map(() => {
              return <RuleSetEditCard />;
            })}
          </Box>
          <Box display="flex" flexDirection="row-reverse">
            <Button
              marginTop="spacing.3"
              size="medium"
              variant="secondary"
              color="primary"
              onClick={() => {
                setRules((prev) => [...prev, rule]);
              }}
            >
              Add rule
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RuleSetEdit;
