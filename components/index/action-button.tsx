import styles from '@/components/index/action-button.module.css';

import Button from "@/components/shared/button";
import { useEffect, useState } from 'react';

const StartButtonIcon = <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 4v16l13 -8z"></path></svg>;
const StopButtonIcon = <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="5" y="5" width="14" height="14" rx="2"></rect></svg>;

interface ActionButtonProps {
    onMessageReceived: (event: NDEFReadingEvent) => void;
};

const ActionButton: React.FC<ActionButtonProps> = (props: ActionButtonProps) => {

    const [isRunning, setIsRunning] = useState(false);

    const [reader] = useState(new NDEFReader());
    reader.onreading = props.onMessageReceived;
    reader.onreadingerror = console.error;

    const [abortController, setAbortController] = useState(new AbortController());
    abortController.signal.onabort = () => setIsRunning(false);

    const [permissionGranted, setPermissionGranted] = useState(false);
    const [showPermissionError, setShowPermissionError] = useState(false);

    useEffect(() => {
        navigator.permissions.query({ name: 'nfc' as PermissionName })
            .then((status: PermissionStatus) => {
                console.log('🐱‍👤', `NFC permission status: `, status.state);

                if (status.state === 'prompt')
                    return;

                if (status.state === 'denied') {
                    setShowPermissionError(true);
                    return;
                }

                setPermissionGranted(status.state === 'granted');
            })
            .catch(e => {
                setShowPermissionError(true);
            });
    }, []);

    const onAction = async () => {
        if (isRunning) {
            abortController.abort('');
            setAbortController(new AbortController());
        } else {
            try {
                await reader.scan({ signal: abortController.signal });
            } catch (ex) {
                console.log('❌', 'Error while scanning for NFC tags', { exception: ex });
            }

            setIsRunning(true);
        }
    };

    return (
        <>
            {showPermissionError && <p>Here goes an error message!</p>}
            <Button className={styles.btn} onClick={onAction} disabled={!permissionGranted}>
                {!isRunning ? StartButtonIcon : StopButtonIcon}
                {!isRunning ? `Start` : `Stop`}
            </Button>
        </>
    );
};

export default ActionButton;