import { NextPage } from 'next';
import { useRouter } from 'next/router';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useEffect } from 'react';

interface ConfirmationProps {
    comicTitle: string;
    comicPrice: string;
    comicImage: string;
    name: string;
    lastName: string;
    email: string;
    address: string;
    state: string;
    city: string;
    zipCode: string;
}

const ConfirmationPage: NextPage<ConfirmationProps> = () => {
    const router = useRouter();

    const { comicTitle, comicPrice, comicImage, name, lastName, email, address, state, city, zipCode } = router.query;

    const isValidData = !!comicTitle && !!comicPrice && !!comicImage;

    useEffect(() => {
        if (!isValidData) {
            router.push('/');
        }
    }, [isValidData, router]);

    if (!isValidData) {
        return null;
    }

    return (
        <LayoutCheckout>
            <Box sx={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <Box sx={{  width: '25%',minWidth: '15rem', margin: '0 1.5rem 2rem' }}>
                    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            sx={{ height: 300 }}
                            image={comicImage as string}
                            title={comicTitle as string}
                        />
                        <CardContent style={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {comicTitle}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{  minWidth: '15rem', margin: '0 1.5rem 2rem' }}>
                    <h1>Successfull Payment</h1>
                    <strong>Comic Detail:</strong>
                    <p>Title: {comicTitle}</p>
                    <p>Price: ${comicPrice}</p>

                    <strong>Personal Information:</strong>
                    <p>Name: {name}</p>
                    <p>LastName: {lastName}</p>
                    <p>Email: {email}</p>
                    <p>Address: {address}</p>
                    <p>State: {state}</p>
                    <p>City: {city}</p>
                </Box>
            </Box>
        </LayoutCheckout>
    );
};

export default ConfirmationPage;
