import React, { FC } from "react";
import { Dialog, DialogContent } from "@mui/material";

type ImgPreviewProps = {
    src: string
    handleClose: () => void
    open: boolean
}

const ImgPreview: FC<ImgPreviewProps> = ({ src, handleClose, open }) => {
    return (
        <Dialog
            open={ open }
            onClose={ handleClose }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <img src={ src } alt=""/>
            </DialogContent>
        </Dialog>
    );
};

export default ImgPreview;