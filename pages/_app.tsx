import Layout from '@/components/shared/layout';
import '@/styles/global.css';
import type { AppProps } from 'next/app'

const CustomApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default CustomApp;