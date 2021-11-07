import React, { FC, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { IGood } from "../models/goodModel";
import { useDropzone } from "react-dropzone";
import { goodsApi } from "../services/goodsService";

const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
} as const;

const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box"
} as const;

const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
};

const img = {
    display: "block",
    width: "auto",
    height: "100%"
};

const SellerPersonalAccount: FC = () => {

    const [addGoodOpen, setAddGoodOpen] = useState(true);
    const [files, setFiles] = useState<File[]>([]);
    const [createGood] = goodsApi.useFetchCreateGoodMutation()

    const formik = useFormik<IGood>({
        initialValues: {
            title: "",
            price: 0,
            discount: 0,
            description: "",
            specifications: []
        },
        onSubmit: async values => {
            await createGood({
                title: values.title,
                images: files,
                price: values.price,
                discount: values.discount,
                description: values.description,
                specifications: values.specifications,
            })
        }
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: acceptedFiles => {
            setFiles(prevFiles => {
                return prevFiles.concat(
                    acceptedFiles.map(file => Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    }))
                );
            });
        }
    });

    const thumbs = files.map(file => (
        <div style={ thumb } key={ file.name }>
            <div style={ thumbInner }>
                {/*@ts-ignore*/ }
                <img src={ file.preview } style={ img }/>
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        //@ts-ignore
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <Box>
            <Tooltip title={ "Добавить товар" }>
                <IconButton onClick={ () => setAddGoodOpen(prev => !prev) }>
                    <AddIcon sx={ { color: theme => theme.appPalette.mainColor } }/>
                </IconButton>
            </Tooltip>

            {
                addGoodOpen &&
                <FormikProvider value={ formik }>
                    <form onSubmit={ formik.handleSubmit }>
                        <TextField
                            fullWidth
                            id="add-good-title"
                            name="title"
                            label="title"
                            value={ formik.values.title }
                            onChange={ formik.handleChange }
                            error={ formik.touched.title && Boolean(formik.errors.title) }
                            helperText={ formik.touched.title && formik.errors.title }
                        />
                        <TextField
                            fullWidth
                            type={ "number" }
                            id="add-good-price"
                            name="price"
                            label="price"
                            value={ formik.values.price }
                            onChange={ formik.handleChange }
                            error={ formik.touched.price && Boolean(formik.errors.price) }
                            helperText={ formik.touched.price && formik.errors.price }

                        />
                        <TextField
                            fullWidth
                            type={ "number" }
                            id="add-good-discount"
                            name="discount"
                            label="discount"
                            value={ formik.values.discount }
                            onChange={ formik.handleChange }
                            error={ formik.touched.discount && Boolean(formik.errors.discount) }
                            helperText={ formik.touched.discount && formik.errors.discount }

                        />
                        <TextField
                            fullWidth
                            id="add-good-description"
                            name="description"
                            label="description"
                            multiline
                            rows={ 5 }
                            value={ formik.values.description }
                            onChange={ formik.handleChange }
                            error={ formik.touched.description && Boolean(formik.errors.description) }
                            helperText={ formik.touched.description && formik.errors.description }
                        />
                        <FieldArray
                            name="specifications"
                            render={ (arrayHelpers) => (
                                <div>
                                    { formik.values.specifications.map((specification, index) => (
                                        <div key={ index }>
                                            <TextField
                                                name={ `specifications[${ index }].title` }
                                                value={ formik.values.specifications[index].title }
                                                onChange={ formik.handleChange }
                                            />
                                            <TextField
                                                name={ `specifications.${ index }.value` }
                                                value={ formik.values.specifications[index].value }
                                                onChange={ formik.handleChange }
                                            />
                                            <button
                                                type="button"
                                                onClick={ () => arrayHelpers.remove(index) }
                                            >
                                                -
                                            </button>
                                        </div>
                                    )) }
                                    <button
                                        type="button"
                                        onClick={ () => arrayHelpers.push({ title: "", value: "" }) }
                                    >
                                        +
                                    </button>
                                </div>
                            ) }
                        />
                        <section className="container">
                            <div { ...getRootProps({ className: "dropzone" }) }>
                                <input { ...getInputProps() } />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            <aside style={ thumbsContainer }>
                                { thumbs }
                            </aside>
                        </section>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Submit
                        </Button>
                    </form>
                </FormikProvider>
            }
        </Box>
    );
};

export default SellerPersonalAccount;