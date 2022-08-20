import styles from '@/components/index/action-button.module.css';

import Button from "@/components/shared/button";
import { IconPlayerPlay, IconPlayerStop } from '@tabler/icons';
import { useEffect, useState } from 'react';

interface ActionButtonProps {
    onMessageReceived: (event: NDEFReadingEvent) => void;
    onPermissionGranted: () => void;
    onPermissionDenied: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = (props: ActionButtonProps) => {

    const [isRunning, setIsRunning] = useState(false);

    const [reader] = useState(new NDEFReader());
    reader.onreading = props.onMessageReceived;
    reader.onreadingerror = console.error;

    const [abortController, setAbortController] = useState(new AbortController());
    abortController.signal.onabort = () => setIsRunning(false);

    const [permissionState, setPermissionState] = useState<PermissionState>(null);

    useEffect(() => {
        navigator.permissions
            .query({ name: 'nfc' as PermissionName })
            .then((status: PermissionStatus) => {
                status.onchange = () => {
                    console.log('🐱‍👤', 'NFC permission status changed to: ', status.state);
                    setPermissionState(status.state);
                };

                setPermissionState(status.state);
            })
            .catch(e => {
                console.error('❌', 'Error while querying for nfc permission', { exception: e });
            });
    }, []);

    useEffect(() => {
        if (permissionState === null)
            return;

        console.log('🐱‍👤', 'NFC permission status: ', permissionState);

        setPermissionState(permissionState);

        if (permissionState === 'denied') {
            props.onPermissionDenied();
            stopScanning();
            return;
        }

        if (permissionState === 'granted') {
            props.onPermissionGranted();
        }
    }, [permissionState]);

    const onAction = async () => {
        if (permissionState === 'denied')
            return;

        if (isRunning)
            stopScanning();
        else
            await startScanning();
    };

    const startScanning = async () => {
        try {
            await reader.scan({ signal: abortController.signal });
            setIsRunning(true);
        } catch (ex) {
            console.log('❌', 'Error while scanning for NFC tags', { exception: ex });
        }
    };

    const stopScanning = () => {
        abortController.abort('');
        setAbortController(new AbortController());

        setIsRunning(false);
    };

    return (
        <div className='w-full'>
            <Button className={styles.btn} onClick={onAction} disabled={(permissionState === 'denied')}>
                {!isRunning ? <IconPlayerPlay className={styles.icon} size={18} /> : <IconPlayerStop className={styles.icon} size={18} />}
                {!isRunning ? 'Start' : 'Stop'}
            </Button>
        </div>
    );
};

export default ActionButton;