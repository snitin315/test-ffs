import {
  Box,
  Dropdown,
  DropdownOverlay,
  SelectInput,
  ActionList,
  ActionListItem,
  TextInput,
  MinusCircleIcon,
  IconButton,
} from "@razorpay/blade/components";

interface RuleSetCreateCardProps {
  deleteRule: (index: number) => void;
}

const RuleSetCreateCard: React.FC<RuleSetCreateCardProps> = ({deleteRule}) => {


  
  return (
    <>
      <Box display="flex" gap="spacing.8" paddingX="spacing.3">
        <Box flex="4">
          <Dropdown selectionType="single">
            <SelectInput
              label=""
              placeholder="Select Rule"
              name="action"
              onChange={({ name, values }) => {
                console.log({ name, values });
              }}
            />
            <DropdownOverlay>
              <ActionList>
                <ActionListItem title="Rule" value="" />
                <ActionListItem title="Rule" value="" />
                <ActionListItem title="Rule" value="" />
                <ActionListItem title="Rule" value="" />
              </ActionList>
            </DropdownOverlay>
          </Dropdown>
        </Box>
        <Box display="flex" flex="3" gap="spacing.6">
          <Box flex="1">
          <TextInput type="number" label="" placeholder="Enter Score" />
          </Box>
          <IconButton icon={MinusCircleIcon} accessibilityLabel="delete" onClick={deleteRule} size="large" />
        </Box>
      </Box>
    </>
  );
};

export default RuleSetCreateCard;
