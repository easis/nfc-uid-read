import { NextPage } from 'next';
import styles from './index.module.css';

const Home: NextPage = () => {
    return (
        <h1 className={styles.title}>
            Hello world!
        </h1>
    );
};

export default Home;
