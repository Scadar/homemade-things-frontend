import React, { FC, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out"
} as const;

const activeStyle = {
    borderColor: "#2196f3"
} as const;

const acceptStyle = {
    borderColor: "#00e676"
} as const;

const rejectStyle = {
    borderColor: "#ff1744"
} as const;

type AppDropzoneType = {
    maxFiles?: number
    setValues: (files: File[]) => void
}

interface CustomFile extends File {
    preview: string;
}

const checkNames = (newFiles: CustomFile[], files: CustomFile[]): boolean => {
    let result = true;

    files.forEach(f => {
        newFiles.forEach(nf => {
            if (f.name === nf.name) {
                result = false;
            }
        });
    });

    return result;
};

const AppDropzone: FC<AppDropzoneType> = ({
                                              maxFiles = 10,
                                              setValues
                                          }) => {

    const [files, setFiles] = useState<CustomFile[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: "image/*",
        onDrop: acceptedFiles => {

            if (acceptedFiles.length === 0) {
                return;
            }

            if (acceptedFiles.length + files.length > maxFiles) {
                enqueueSnackbar("Нельзя загрузить больше " + maxFiles + " изображений", { variant: "error" });
                return;
            }

            if (!checkNames(acceptedFiles as any, files)) {
                enqueueSnackbar("Нельзя выбирать изображения с одинаковыми именами", { variant: "error" });
                return;
            }

            setFiles(prevFiles => {
                return prevFiles.concat(
                    acceptedFiles.map(file => Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    }))
                );
            });
        },
        multiple: true
    });

    const deleteFileByName = (name: string) => {
        setFiles(prevFiles => prevFiles.filter(f => f.name !== name));
    };

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.map(file => (
        <Tooltip title={ file.name } key={ file.name }>
            <Box
                sx={ {
                    display: "inline-flex",
                    borderRadius: "2px",
                    border: "1px solid #eaeaea",
                    marginBottom: theme => theme.spacing(1),
                    marginRight: theme => theme.spacing(1),
                    width: "150px",
                    height: "150px",
                    padding: theme => theme.spacing(0.5),
                    position: "relative"
                } }
            >
                <Box
                    sx={ {
                        display: "flex",
                        minWidth: 0,
                        overflow: "hidden"
                    } }
                >
                    <Box
                        component={ "img" }
                        src={ file.preview }
                        sx={ {
                            display: "block",
                            width: "auto",
                            height: "100%"
                        } }
                        alt={ "" }
                    />
                </Box>
                <IconButton
                    sx={ {
                        position: "absolute",
                        top: 0,
                        right: 0
                    } }
                    onClick={ () => deleteFileByName(file.name) }
                >
                    <CloseIcon/>
                </IconButton>
            </Box>
        </Tooltip>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(() => {
        setValues(files);
    }, [files, setValues]);

    return (
        <Box>
            <Box { ...getRootProps({ style }) }>
                <input { ...getInputProps() } />
                <Typography>Перетащите сюда изображения или нажмите для выбора файлов</Typography>
            </Box>
            <Box
                component={ "aside" }
                sx={ {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: theme => theme.spacing(2)
                } }
            >
                { thumbs }
            </Box>
            <Box>
                <Typography>{ `Загружено ${ files.length }/${ maxFiles }` }</Typography>
            </Box>
        </Box>
    );
};

export default AppDropzone;