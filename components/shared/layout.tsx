import Footer from './footer';
import styles from './layout.module.css';

interface LayoutProps {
    children: JSX.Element;
};

const Layout = (props: LayoutProps) => {
    return (
        <>
            <div className={styles.app}>
                <h1 className={styles.title}>
                    NFC UID Read
                </h1>

                <main className={styles.main}>
                    {props.children}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Layout;