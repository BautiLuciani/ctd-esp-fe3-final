import { Box, Button, Card, CardContent, CardMedia, Step, StepLabel, Stepper, Typography } from "@mui/material";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { IComic } from "interface/comic";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from "dh-marvel/components/mui/CustomInput";
import { schema } from "rules";

interface FormPageProps {
    comicDetail: IComic;
}

const steps = [
    'Personal Information',
    'Delivery address',
    'Details of payment',
];

const FormCheckout: NextPage<FormPageProps> = ({ comicDetail }) => {

    type DataForm = yup.InferType<typeof schema>;

    const {
        control,
        formState: { errors, isValid },
    } = useForm<DataForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            name: "",
            lastName: "",
            email: "",
            address: "",
            addressDetail: "",
            state: "",
            city: "",
            zipCode: "",
            cardNumber: "",
            cardName: "",
            expirationDate: "",
            cvc: ""
        },
    });

    const name = useWatch({ control, name: 'name' });
    const lastName = useWatch({ control, name: 'lastName' });
    const email = useWatch({ control, name: 'email' });

    const address = useWatch({ control, name: 'address' });
    const state = useWatch({ control, name: 'state' });
    const city = useWatch({ control, name: 'city' });
    const zipCode = useWatch({ control, name: 'zipCode' });

    const cardNumber = useWatch({ control, name: 'cardNumber' });
    const cardName = useWatch({ control, name: 'cardName' });
    const expirationDate = useWatch({ control, name: 'expirationDate' });
    const cvc = useWatch({ control, name: 'cvc' });

    const isStepValid = (step: number) => {
        switch (step) {
            case 0:
                return (!errors.name && !errors.lastName && !errors.email && name.trim() !== '' && lastName.trim() !== '' && email.trim() !== '');
            case 1:
                return (!errors.address && !errors.addressDetail && !errors.state && !errors.city && !errors.zipCode && address.trim() !== '' && state.trim() !== '' && city.trim() !== '' && zipCode.trim() !== '');
            case 2:
                return (!errors.cardNumber && !errors.cardName && !errors.expirationDate && !errors.cvc && cardNumber.trim() !== '' && cardName.trim() !== '' && expirationDate.trim() !== '' && cvc.trim() !== '');
            default:
                return true
        }
    };

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const router = useRouter();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target as HTMLFormElement);
    
        router.push({
            pathname: '/confirmacion-compra',
            query: {
                name: name,
                lastName: lastName,
                email: email,
                address: address,
                state: state,
                city: city,
                zipCode: zipCode,
                comicTitle: comicDetail.title,
                comicPrice: comicDetail.price,
                comicImage: comicDetailImage        
            }
        });
    };

    const comicDetailImage = comicDetail.images.length > 0
    ? `${comicDetail.images[0].path}.${comicDetail.images[0].extension}`
    : 'https://pbs.twimg.com/profile_images/1560508217867718657/8ak-Td6l_400x400.jpg' 
    

    return (
        <LayoutCheckout>
            <Box sx={{ width: '80%' }}>
                <Typography variant="h4" align="center" margin="2rem">
                    Purchase Form
                </Typography>

                <Box sx={{ margin: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>

                    <Box sx={{ width: '25%', minWidth: '15rem', margin: '0 1.5rem 2rem' }}>
                        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={comicDetailImage}
                                title={comicDetail.title}
                            />
                            <CardContent style={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {comicDetail.title}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    <strong>Current Price:</strong> {comicDetail.price}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    <strong>Stock:</strong> {comicDetail.stock}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box sx={{ width: '65%' }}>
                        {comicDetail.stock === 0 ? (
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                Currently we dont have stock for this Comic, please try with other
                            </Typography>
                        ) : (
                            <>
                                <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: '2rem' }}>
                                    {steps.map((label, index) => {
                                        const stepProps: { completed?: boolean } = {};
                                        const labelProps: { optional?: React.ReactNode } = {};
                                        return (
                                            <Step key={label} {...stepProps}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>

                                {
                                    <>
                                        <form onSubmit={handleSubmit}>
                                            {activeStep === 0 && (
                                                <>
                                                    <CustomInput name="name" label="Name" type="text" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.name?.message}
                                                    </Typography>

                                                    <CustomInput name="lastName" label="LastName" type="text" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.lastName?.message}
                                                    </Typography>

                                                    <CustomInput name="email" label="Email" type="email" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.email?.message}
                                                    </Typography>
                                                </>
                                            )}
                                            {activeStep === 1 && (
                                                <>
                                                    <CustomInput name="address" label="Address" type="text" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.address?.message}
                                                    </Typography>

                                                    <CustomInput name="state" label="State" type="text" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.state?.message}
                                                    </Typography>

                                                    <CustomInput name="city" label="City" type="text" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.city?.message}
                                                    </Typography>

                                                    <CustomInput name="zipCode" label="ZipCode" type="text" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.zipCode?.message}
                                                    </Typography>
                                                </>
                                            )}
                                            {activeStep === 2 && (
                                                <>
                                                    <CustomInput name="cardNumber" label="cardNumber" type="text" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.cardNumber?.message}
                                                    </Typography>

                                                    <CustomInput name="cardName" label="cardName" type="text" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.cardName?.message}
                                                    </Typography>

                                                    <CustomInput name="expirationDate" label="expirationDate" type="text" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.expirationDate?.message}
                                                    </Typography>

                                                    <CustomInput name="cvc" label="cvc" type="text" control={control} defaultValue="" required={true} />
                                                    <Typography variant="caption" color="error">
                                                        {errors.cvc?.message}
                                                    </Typography>
                                                </>
                                            )}

                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'center' }}>
                                                <Button size="small" variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ margin: '0 2rem 1rem' }}>
                                                    Back
                                                </Button>

                                                {activeStep === steps.length - 1 ? (

                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            type="submit"
                                                            disabled={!isStepValid(activeStep)}
                                                            sx={{ margin: '0 2rem 1rem' }}
                                                        >
                                                            Finish
                                                        </Button>

                                                ) : (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        onClick={() => { handleNext() }}
                                                        disabled={!isStepValid(activeStep)}
                                                        sx={{ margin: '0 2rem 1rem' }}
                                                    >
                                                        Next
                                                    </Button>
                                                )}
                                            </Box>

                                        </form>

                                    </>
                                }
                            </>
                        )}
                    </Box>


                </Box>

            </Box>
        </LayoutCheckout>
    );
};
export default FormCheckout;


export const getServerSideProps: GetServerSideProps<FormPageProps> = async ({ query }) => {
    try {
        const comicId = parseInt(query.id as string) || 0;
        const comicDetail = await getComic(comicId);

        return {
            props: {
                comicDetail: comicDetail,
            },
        };

    } catch (error) {
        console.error('Error fetching comic detail:', error);
        return {
            props: {
                comicDetail: null,
            },
        };
    }
};