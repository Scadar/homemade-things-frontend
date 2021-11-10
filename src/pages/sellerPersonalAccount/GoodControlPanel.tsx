import React, { FC } from "react";
import AppIcon from "../../components/UI/AppIcon";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/material";

type GoodControlPanelProps = {
    handleOpenAddGoodModal: () => void
}

const GoodControlPanel: FC<GoodControlPanelProps> = ({ handleOpenAddGoodModal }) => {
    return (
        <Stack spacing={ 2 } direction={ "row" } sx={ { mb: 2 } }>
            <AppIcon
                Icon={ AddIcon }
                onClick={ handleOpenAddGoodModal }
                tooltipTitle={ "Добавить товар" }
                iconProps={ {
                    sx: {
                        color: theme => theme.appPalette.mainColor
                    }
                } }
            />
        </Stack>
    );
};

export default GoodControlPanel;