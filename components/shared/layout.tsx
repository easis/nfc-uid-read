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
                    <label htmlFor="default-toggle" className="inline-flex relative items-center mb-4 cursor-pointer">
                        <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">hex</span>
                        <input type="checkbox" value="" id="default-toggle" className="sr-only peer" />
                        <div className="w-9 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[3ch] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">dec</span>
                    </label>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Layout;