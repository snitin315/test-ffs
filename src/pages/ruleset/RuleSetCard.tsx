import React from "react";
import { Box, Text, Button } from "@razorpay/blade/components";
import { useNavigate } from "react-router-dom";

interface RuleSetCardProps {
  name: string;
  description: string;
}

const RuleSetCard: React.FC<RuleSetCardProps> = ({ name, description }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        borderRadius="medium"
        paddingX="spacing.5"
        paddingY="spacing.5"
        elevation="lowRaised"
      >
        <Text size="large">{name}</Text>
        <Box display="flex" gap="spacing.3">
          <Button
            variant="secondary"
            color="primary"
            onClick={() => {
              navigate("/rule-set/edit", {
                state: {
                  name: name,
                  description: description,
                },
              });
            }}
          >
            Edit
          </Button>
          <Button variant="secondary" color="negative">
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RuleSetCard;
