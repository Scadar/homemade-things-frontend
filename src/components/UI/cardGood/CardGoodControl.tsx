import React, { FC } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AppMenu from "../appMenu/AppMenu";
import AppIcon from "../AppIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { goodsApi } from "../../../services/goodsService";
import { useSnackbar } from "notistack";

type CardGoodControlProps = {
    asOwner?: boolean
    goodId: number
}

const CardGoodControl: FC<CardGoodControlProps> = ({ asOwner, goodId }) => {

    const [deleteGood, { isLoading }] = goodsApi.useFetchDeleteGoodMutation();
    const { enqueueSnackbar } = useSnackbar();
    if (asOwner) {
        return (
            <AppMenu
                menuItems={ [
                    {
                        title: "Изменить",
                        onClick: () => {}
                    },
                    {
                        title: "Удалить",
                        onClick: () => {
                            deleteGood(goodId)
                            .unwrap()
                            .then(() => {
                                enqueueSnackbar("Успешно удалено", { variant: "success" });
                            })
                            .catch(() => {
                                enqueueSnackbar("Ошибка удаления", { variant: "error" });
                            });
                        },
                        disabled: isLoading
                    }
                ] }
                triggerItem={ (
                    <AppIcon
                        Icon={ MoreVertIcon }
                        iconProps={ {
                            sx: {
                                color: theme => theme.appPalette.mainColor
                            }
                        } }
                    />
                ) }
            />
        );
    }

    return (
        <FavoriteBorderIcon
            sx={ {
                cursor: "pointer",
                fontSize: 28
            } }
        />
    );
};

export default CardGoodControl;