import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { InfoCircle } from "iconsax-react";
import { forwardRef, useState } from "react";

type Props = {
  id?: string;
  placeholder?: string;
  info?: string;
};

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ id, placeholder = "Enter password", info, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
      <InputGroup size="md">
        <Input
          id={id}
          ref={ref}
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...props}
        />
        <InputRightElement width="7rem" justifyContent="end" marginRight={2}>
          {info && (
            <Tooltip label={info}>
              <InfoCircle size={24} variant="Bold" />
            </Tooltip>
          )}
          <Button h="1.75rem" size="sm" onClick={handleClick} marginLeft={2}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }
);

export default PasswordInput;
