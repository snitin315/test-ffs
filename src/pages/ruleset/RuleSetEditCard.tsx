import {
  Box,
  Dropdown,
  DropdownOverlay,
  SelectInput,
  ActionList,
  ActionListItem,
  TextInput,
  Switch,
} from "@razorpay/blade/components";

const RuleSetEditCard = () => {
  return (
    <>
      <Box display="flex" gap="spacing.6">
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

        <Box flex="2">
          <TextInput type="number" label="" placeholder="Enter Score" />
        </Box>

        <Box flex="1">
          <Switch
            accessibilityLabel="Toggle DarkMode"
            size="medium"
            alignSelf="center"
          />
        </Box>
      </Box>
    </>
  );
};

export default RuleSetEditCard;
