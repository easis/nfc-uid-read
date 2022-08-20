import styles from '@/components/index/compatible.module.css';

import ActionButton from "@/components/index/action-button";
import SettingsButton from '@/components/index/settings-button';
import Message from '@/components/index/message';

import { useEffect, useState } from "react";
import { NdefMessage } from '@/lib/types/nfc';

export const enum UidFormat {
    HEX, DEC
};

interface CompatibleProps {

};

const Compatible: React.FC<CompatibleProps> = (props: CompatibleProps) => {

    const [uidFormat, setUidFormat] = useState(UidFormat.DEC);
    const [messages, setMessages] = useState<NdefMessage[]>([]);

    const [isPermissionGranted, setIsPermissionGranted] = useState(false);
    const [isPermissionDenied, setIsPermissionDenied] = useState(false);

    const onMessage = (event: NDEFReadingEvent) => {
        console.log('🐱‍👤', 'Received NDEF', { uid: event.serialNumber, message: event.message, timestamp: event.timeStamp });

        const message = new NdefMessage(event.serialNumber, event.message.records);
        setMessages([message, ...messages]);
    };

    const onClearMessages = () => {
        console.log('🐱‍👤', 'Clearing messages');
        setMessages([]);
    };

    const onSetUidFormat = (format: UidFormat) => {
        setUidFormat(format);

        let formatName = '';
        switch (format) {
            case UidFormat.DEC:
                formatName = 'dec';
                break;

            case UidFormat.HEX:
                formatName = 'hex';
                break;

            default:
                formatName = 'unknown';
                break;
        }

        console.log('🐱‍👤', `Setting UID format to ${formatName}`);
    };

    const onPermissionDenied = () => {
        setIsPermissionDenied(true);
    };

    const onPermissionGranted = () => {
        setIsPermissionGranted(true);
    };

    return (
        <>
            {/* TODO: add a little description of what happens when you click the start button */}
            <div className='flex flex-col mb-4'>
                {isPermissionDenied && <p className='pb-2'>❌ You denied NFC permission!</p>}

                <div className='flex flex-row'>
                    <ActionButton
                        onMessageReceived={onMessage}
                        onPermissionGranted={onPermissionGranted}
                        onPermissionDenied={onPermissionDenied}
                    />

                    {isPermissionGranted &&
                        <SettingsButton
                            currentFormat={uidFormat}
                            onClearMessages={onClearMessages}
                            onSetFormat={onSetUidFormat}
                        />
                    }
                </div>
            </div>

            <div className={styles['messages-container']}>
                {messages.map((m) => <Message key={`${m.toDec()}-${m.createdAt.getTime()}`} data={m} format={uidFormat} />)}
            </div>
        </>
    );
};

export default Compatible;