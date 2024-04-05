import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { IComic } from '../interface/comic';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Pagination, Stack, Typography } from '@mui/material';
import Link from 'next/link';

interface HomePageProps {
    comics: IComic[]
    total: number
}

const HomePage: NextPage<HomePageProps> = ({comics, total}) => {

    const router = useRouter();
    const limit = 12;
    const [page, setPage] = useState<number>(1);

    const changePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
        router.push(`/?offset=${(newPage - 1) * limit}`);
    };

    return (
        <LayoutGeneral>
            <Head>
                <title>Marvel Page</title>
                <meta name="description" content="Page where 12 Marvel characters are displayed"/>
                <link rel="icon" href="/marvel.png"/>
            </Head>

            <BodySingle title={"Marvel Characters"}>
            <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {comics.map((itemComic: IComic) => (
                        <Card
                            sx={{ width: '15rem', margin: '2rem', display: 'flex', flexDirection: 'column' }}
                            key={itemComic.id}
                        >
                            <CardMedia
                                sx={{ height: 150 }}
                                image={
                                    itemComic.images.length > 0
                                        ? `${itemComic.images[0].path}.${itemComic.images[0].extension}`
                                        : 'https://pbs.twimg.com/profile_images/1560508217867718657/8ak-Td6l_400x400.jpg'
                                }
                                title={itemComic.title}
                            />
                            <CardContent style={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="subtitle2" component="div">
                                    {itemComic.title}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-around' }}>
                                <Button size="small" variant="outlined">
                                    <Link href={`/comics/${itemComic.id}`} passHref>
                                        <a style={{ textDecoration: 'none', color: '#1565c0' }}>DETAIL</a>
                                    </Link>
                                </Button>
                                <Link href={`/checkout/${itemComic.id}`} passHref>
                                    <Button size="small" variant="contained">
                                        BUY
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
                    <Stack spacing={2}>
                        <Pagination
                            count={Math.ceil(total / limit)}
                            page={page}
                            onChange={changePage}
                            variant="text"
                            color="primary"
                        />
                    </Stack>
                </Box>
            </BodySingle>
        </LayoutGeneral>
    )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ query }) => {

    try {
        const limit = 12
        const offset = parseInt(query.offset as string) || 0
        const comics = await getComics(offset, limit)

        return {
            props: {
                comics: comics.data.results,
                total: comics.data.total,
            }
        }
    } catch (error) {
        return {
            props: {
                comics: [],
                total: 0,
            }
        }
    }
}

