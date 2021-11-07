import React, { FC, useMemo } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { ProfileModalType } from "../Profile";
import ModalContentBirthday from "./ModalContentBirthday";
import ModalContentEmail from "./ModalContentEmail";
import ModalContentName from "./ModalContentName";
import ModalContentPhone from "./ModalContentPhone";
import { flexStyles } from "../../../utils/styleUtils";

type ProfileModalProps = {
    type: ProfileModalType
    setType: (value: ProfileModalType | null) => void
}

type ModalData = {
    type: ProfileModalType
    Component: React.ReactNode
    title: string
}

const modalData: ModalData[] = [
    {
        type: "birthday",
        Component: <ModalContentBirthday/>,
        title: "Дата рождения"
    },
    {
        type: "email",
        Component: <ModalContentEmail/>,
        title: "Ваша почта"
    },
    {
        type: "name",
        Component: <ModalContentName/>,
        title: "Ваше имя"
    },
    {
        type: "phone",
        Component: <ModalContentPhone/>,
        title: "Ваш телефон"
    }
];

const getModalDataByType = (type: ProfileModalType): ModalData => {
    return modalData.find(v => v.type === type)!;
};

const ProfileModal: FC<ProfileModalProps> = ({ type, setType }) => {

    const currentModalData = useMemo(() => {
        return getModalDataByType(type);
    }, [type]);

    const handleClose = () => {
        setType(null);
    };

    return (
        <Dialog
            open={ true }
            onClose={ handleClose }
        >
            <DialogTitle
                sx={ {
                    ...flexStyles("center", "center")
                } }
            >
                <Typography
                    sx={ { fontWeight: "bold", fontSize: "26px" } }
                    variant="h5"
                    component="h2"
                >
                    { currentModalData.title }
                </Typography>
            </DialogTitle>
            <DialogContent>
                { currentModalData.Component }
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleClose }>Ok</Button>
                <Button onClick={ handleClose } autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileModal;