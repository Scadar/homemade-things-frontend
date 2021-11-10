import React, { FC, useState } from "react";
import { goodsApi } from "../../services/goodsService";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { IGood } from "../../models/goodModel";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { flexStyles } from "../../utils/styleUtils";
import CloseIcon from "@mui/icons-material/Close";
import AppDropzone from "../../components/UI/AppDropzone";
import * as yup from "yup";
import AppIcon from "../../components/UI/AppIcon";
import { useSnackbar } from "notistack";

const specificationArrayValidation = yup.object({
    title: yup
    .string()
    .min(1, "Минимум 1 символ")
    .max(30, "Максимум 30 символов")
    .required("Название спецификации обязательно"),
    value: yup
    .string()
    .min(1, "Минимум 1 символ")
    .max(30, "Максимум 30 символов")
    .required("Значение спецификации обязательно")
});

const validationSchema = yup.object({
    title: yup
    .string()
    .min(5, "Минимум 5 символов")
    .max(50, "Максимум 50 символов")
    .required("Название товара обязательно"),
    price: yup
    .number()
    .min(100, "Минимальная цена 100 рублей")
    .positive("Цена должна быть положительной")
    .required("Цена обязательна"),
    discount: yup
    .number()
    .min(0, "Минимальная скидка 0%")
    .max(99, "Максимальная скидка 99%"),
    description: yup
    .string()
    .min(5, "Минимум 5 символов")
    .max(2500, "Максимум 2500 символов")
    .required("Описание товара обязательно"),
    specifications: yup
    .array()
    .of(specificationArrayValidation)
});

type AddGoodProps = {
    open: boolean
    handleCloseAddGoodModal: () => void
}

const AddGood: FC<AddGoodProps> = ({ handleCloseAddGoodModal, open }) => {
    const [createGood] = goodsApi.useFetchCreateGoodMutation();
    const [files, setFiles] = useState<File[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik<IGood>({
        initialValues: {
            title: "",
            price: 0,
            discount: 0,
            description: "",
            specifications: [{ title: "", value: "" }]
        },
        validationSchema,
        onSubmit: async values => {
            await createGood({
                title: values.title,
                images: files,
                price: values.price,
                discount: values.discount,
                description: values.description,
                specifications: values.specifications
            })
            .unwrap()
            .then(() => {
                enqueueSnackbar("Товар успешно добавлен", { variant: "success" });
                formik.resetForm();
                handleCloseAddGoodModal();
            });
        }
    });
    return (
        <Dialog
            open={ open }
            onClose={ handleCloseAddGoodModal }
            fullWidth
            maxWidth={ "lg" }
        >
            <DialogTitle
                sx={ {
                    ...flexStyles("center", "space-between")
                } }
            >
                <Typography
                    variant={ "h4" }
                    sx={ {
                        my: theme => theme.spacing(2)
                    } }
                >
                    Добавление товара
                </Typography>
                <AppIcon
                    Icon={ CloseIcon }
                    onClick={ handleCloseAddGoodModal }
                    tooltipTitle={ "Закрыть" }
                    iconProps={ {
                        sx: {
                            color: theme => theme.appPalette.mainColor
                        }
                    } }
                />
            </DialogTitle>
            <DialogContent>
                <Box sx={ { mt: 1 } }>
                    <FormikProvider value={ formik }>
                        <form onSubmit={ formik.handleSubmit }>
                            <Stack spacing={ 3 } direction={ "column" }>
                                <TextField
                                    id="add-good-title"
                                    name="title"
                                    label="Название товара"
                                    value={ formik.values.title }
                                    onChange={ formik.handleChange }
                                    error={ formik.touched.title && Boolean(formik.errors.title) }
                                    helperText={ formik.touched.title && formik.errors.title }
                                />
                                <TextField
                                    type={ "number" }
                                    id="add-good-price"
                                    name="price"
                                    label="Цена товара"
                                    value={ formik.values.price }
                                    onChange={ formik.handleChange }
                                    error={ formik.touched.price && Boolean(formik.errors.price) }
                                    helperText={ formik.touched.price && formik.errors.price }
                                    InputProps={ { startAdornment: <AttachMoneyIcon/> } }
                                />
                                <TextField
                                    type={ "number" }
                                    id="add-good-discount"
                                    name="discount"
                                    label="Скидка в процентах"
                                    value={ formik.values.discount }
                                    onChange={ formik.handleChange }
                                    error={ formik.touched.discount && Boolean(formik.errors.discount) }
                                    helperText={ formik.touched.discount && formik.errors.discount }
                                    InputProps={ {
                                        startAdornment:
                                            <Typography
                                                variant={ "h6" }
                                                sx={ {
                                                    mx: 0.5,
                                                    fontWeight: 800
                                                } }
                                            >
                                                %
                                            </Typography>
                                    } }
                                />
                                <TextField
                                    id="add-good-description"
                                    name="description"
                                    label="Описание товара"
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
                                        <Stack spacing={ 2 } direction={ "column" }>
                                            { formik.values.specifications.map((specification, index) => {

                                                const getErrorInfo = (
                                                    obj: "title" | "value",
                                                    type: "error" | "helperText"
                                                ): boolean | string => {
                                                    if (!formik.touched.specifications) {
                                                        return false;
                                                    }
                                                    if (formik.touched.specifications.length === 0) {
                                                        return false;
                                                    }
                                                    if (!formik.touched.specifications[index]) {
                                                        return false;
                                                    }
                                                    if (!formik.touched.specifications[index][obj]) {
                                                        return false;
                                                    }
                                                    if (!formik.errors.specifications) {
                                                        return false;
                                                    }
                                                    if (!formik.errors.specifications[index]) {
                                                        return false;
                                                    }
                                                    //@ts-ignore
                                                    if (!formik.errors.specifications[index][obj]) {
                                                        return false;
                                                    }
                                                    if (type === "error") {
                                                        //@ts-ignore
                                                        return Boolean(formik.errors.specifications[index][obj]);
                                                    } else {
                                                        //@ts-ignore
                                                        return formik.errors.specifications[index][obj];
                                                    }

                                                };

                                                return (
                                                    <Box key={ index }>
                                                        <Stack spacing={ 2 } direction={ "row" }>
                                                            <TextField
                                                                name={ `specifications[${ index }].title` }
                                                                value={ formik.values.specifications[index].title }
                                                                onChange={ formik.handleChange }
                                                                label={ "Спецификация" }
                                                                sx={ { minWidth: 350 } }
                                                                //@ts-ignore
                                                                error={ getErrorInfo("title", "error") }
                                                                helperText={ getErrorInfo("title", "helperText") }
                                                            />
                                                            <TextField
                                                                name={ `specifications.${ index }.value` }
                                                                value={ formik.values.specifications[index].value }
                                                                onChange={ formik.handleChange }
                                                                label={ "Значение спецификации" }
                                                                sx={ { minWidth: 350 } }
                                                                //@ts-ignore
                                                                error={ getErrorInfo("value", "error") }
                                                                helperText={ getErrorInfo("value", "helperText") }
                                                            />
                                                            {
                                                                index > 0 &&
                                                                <Box sx={ { ...flexStyles("center", "center") } }>
                                                                    <IconButton
                                                                        onClick={ () => arrayHelpers.remove(index) }
                                                                    >
                                                                        <CloseIcon/>
                                                                    </IconButton>
                                                                </Box>
                                                            }
                                                        </Stack>
                                                    </Box>
                                                );
                                            }) }
                                            <Box>
                                                <Button
                                                    onClick={ () => arrayHelpers.push({ title: "", value: "" }) }
                                                >
                                                    Добавить спецификацию
                                                </Button>
                                            </Box>
                                        </Stack>
                                    ) }
                                />
                            </Stack>

                            <Box sx={ { mt: 6 } }>
                                <Typography variant={ "h6" }>Изображения товара</Typography>
                                <AppDropzone setValues={ setFiles }/>
                            </Box>
                            <Button color="primary" variant="contained" fullWidth type="submit" sx={ { my: 6 } }>
                                Создать товар
                            </Button>
                        </form>
                    </FormikProvider>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AddGood;