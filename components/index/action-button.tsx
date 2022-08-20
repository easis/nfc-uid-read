import styles from '@/components/index/action-button.module.css';

import Button from "@/components/shared/button";
import { IconPlayerPlay, IconPlayerStop } from '@tabler/icons';
import { useEffect, useState } from 'react';

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
                console.log('🐱‍👤', 'NFC permission status: ', status.state);

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
                {!isRunning ? <IconPlayerPlay className={styles.icon} size={18} /> : <IconPlayerStop className={styles.icon} size={18} />}
                {!isRunning ? 'Start' : 'Stop'}
            </Button>
        </>
    );
};

export default ActionButton;