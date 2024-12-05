import { CreatePoll } from '@/components/CreatePoll';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Create poll</title>
            </Head>
            <CreatePoll />
        </>
    );
}
