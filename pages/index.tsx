import styles from './index.module.css';

import Button from '@/components/shared/button';
import Spinner from '@/components/shared/spinner';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import NotCompatible from '@/components/index/not-compatible';
import Compatible from '@/components/index/compatible';

const Home: NextPage = () => {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [isCompatible, setIsCompatible] = useState<boolean>(false);

    const [isFully, setIsFully] = useState<boolean>(false);

    useEffect(() => {
        checkCompatibility();
    }, []);

    useEffect(() => {
        setIsFully(window['fully'] !== undefined);
    }, [setIsFully]);

    return (
        <>
            {isFully && <div>Is Fully</div>}
            {!isReady && <div className={styles.container}><Spinner text='Checking if your device and browser are compatible with NFC...' /></div>}

            {(isReady && !isCompatible) && <NotCompatible onRetry={checkCompatibility} canRetry={isReady} />}
            {(isReady && isCompatible) && <Compatible />}

        </>
    );

    function checkCompatibility() {
        setIsReady(false);

        setTimeout(() => {
            setIsCompatible('NDEFReader' in window);
            setIsReady(true);
        }, 500);
    }
};

export default Home;
