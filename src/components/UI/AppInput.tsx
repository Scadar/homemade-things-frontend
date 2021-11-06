import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const AppTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 24px;
    box-shadow: 0 2px 6px 0 rgba(136, 148, 171, 0.2), 0 24px 20px -24px rgba(71, 82, 107, 0.1);
  }
  & fieldset {
    border:none;
    border-width: 0;
  }
`;