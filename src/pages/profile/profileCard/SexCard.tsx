import React, { FC } from "react";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";

const SexCard: FC = () => {

    const [gender, setGender] = React.useState("");

    const handleChangeGender = (e: any) => {
        setGender(e.target.value);
    };

    return (
        <FormControl sx={ { marginLeft: "auto" } } component="fieldset">
            <FormLabel component="legend">Пол</FormLabel>
            <RadioGroup
                aria-label="Пол"
                defaultValue="female"
                name="radio-buttons-group"
                value={ gender }
                onChange={ handleChangeGender }
            >
                <FormControlLabel
                    value="female"
                    control={ <Radio/> }
                    label="Муж."
                />
                <FormControlLabel
                    value="male"
                    control={ <Radio/> }
                    label="Жен."
                />
            </RadioGroup>
        </FormControl>
    );
};

export default SexCard;