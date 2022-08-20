import styles from '@/components/index/message.module.css';
import { NdefMessage } from '@/lib/types/nfc';
import { UidFormat } from './compatible';

interface MessageProps {
    data: NdefMessage;
    format: UidFormat;
};

const Message: React.FC<MessageProps> = (props: MessageProps) => {
    return (
        <div className={styles.container}>
            {props.format == UidFormat.DEC ? props.data.toDec() : props.data.toHex()}

            <span className='float-right'>
                {props.data.getCreatedAtTime()}
            </span>
        </div>
    );
};

export default Message;