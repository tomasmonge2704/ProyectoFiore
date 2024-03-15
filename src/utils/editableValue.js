import {
  Editable,
  IconButton,
  ButtonGroup,
  Input,
  EditablePreview,
  EditableInput,
  useEditableControls,
  Flex,
} from "@chakra-ui/react";
import { EditIcon,CheckIcon,CloseIcon } from "@chakra-ui/icons";
export default function EditableValue({ defaultValue }) {
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={defaultValue}
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <EditablePreview />
      {/* Here is the custom input */}
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
  );
}
