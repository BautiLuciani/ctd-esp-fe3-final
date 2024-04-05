import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { getComic } from 'dh-marvel/services/marvel/marvel.service';
import { IComic } from 'interface/comic';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react'

interface DetailPageProps {
    comicDetail: IComic;
}

const DetailPage: NextPage<DetailPageProps> = ({ comicDetail }) => {

    return (
        <LayoutGeneral>
            <Head>
                <title>Comic Detail</title>
                <meta name="description" content="Comic detail page" />
                <link rel="icon" href="/marvel.png" />
            </Head>

            <BodySingle title={'COMIC DETAIL'}>
                <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    <Card
                        sx={{ width: '25rem', margin: '20px', display: 'flex', flexDirection: 'column' }}
                        key={comicDetail.id}
                    >
                        <CardMedia
                            sx={{ height: 200 }}
                            image={
                                comicDetail.images.length > 0
                                    ? `${comicDetail.images[0].path}.${comicDetail.images[0].extension}`
                                    : 'https://pbs.twimg.com/profile_images/1560508217867718657/8ak-Td6l_400x400.jpg'
                            }
                            title={comicDetail.title}
                        />
                        <CardContent style={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {comicDetail.title}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Description:</strong>{comicDetail.textObjects.length >= 1 ? comicDetail.textObjects[0].text : 'Pendiente'}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Current Price:</strong> {comicDetail.price}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Previous Price:</strong> {comicDetail.oldPrice}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Stock:</strong> {comicDetail.stock}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Characters:</strong>
                                {comicDetail.characters.items.length >= 1 || 0 ? (
                                    <ul>
                                        {comicDetail.characters.items.map((character, index) => {
                                            const characterId = parseInt(character.resourceURI.slice(-7), 10);
                                            return (
                                                <li key={index}>
                                                    <Link href={`/personajes/${characterId}`} passHref>
                                                        <a>{character.name}</a>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <span>No Characters Associated</span>
                                )}
                            </Typography>


                        </CardContent>
                        <CardActions sx={{ justifyContent: 'space-around' }}>
                            <Link href={`/checkout/${comicDetail.id}`} passHref>
                                <Button size="small" 
                                variant="contained" 
                                disabled={(comicDetail.stock !== undefined && comicDetail.stock < 1) || false} 
                                >
                                    BUY
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Box>

            </BodySingle>
        </LayoutGeneral>
    );
};

export default DetailPage;

export const getServerSideProps: GetServerSideProps<DetailPageProps> = async ({ query }) => {
    try {
        const id = parseInt(query.id as string) || 0; 
        const comicDetail = await getComic(id);

            return {
                props: {
                    comicDetail,
                },
            };
    } catch (error) {
        return {
            props: {
                comicDetail: null,
            },
        };
    }
};
