import React, { FC } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { flexStyles } from "../../../utils/styleUtils";

type CommentsModalProps = {
    openModal?: any
}

const CommentsModal: FC<CommentsModalProps> = ({ openModal }) => {
    return (
        <Dialog
            open={ openModal }


        >
            <DialogTitle
                sx={ {
                    ...flexStyles("center", "center")
                } }
            >
                <Typography
                    sx={ { fontWeight: "bold", fontSize: "26px" } }
                    variant="h5"
                    component={ "span" }
                >
                    Тут будут отзывы и оценки товара
                </Typography>
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>


                <Button autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommentsModal;