import styles from '@/components/index/settings-button.module.css';

import Button from "@/components/shared/button";

import { IconSettings, IconClearAll, IconCheck } from "@tabler/icons";
import { useState } from 'react';
import { UidFormat } from './compatible';

interface SettingsButtonProps {
    currentFormat: UidFormat;
    onClearMessages: () => void;
    onSetFormat: (format: UidFormat) => void;
};

const SettingsButton: React.FC<SettingsButtonProps> = (props: SettingsButtonProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const onClearAll = () => {
        props.onClearMessages();
        setIsOpen(false);
    };

    const onSetFormat = (format: UidFormat) => {
        props.onSetFormat(format);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <Button id="settings-button" data-dropdown-toggle="settings-button-dropdown" onClick={() => setIsOpen(!isOpen)}>
                <IconSettings />
            </Button>

            <div id="settings-button-dropdown" className={styles.items} data-expanded={isOpen}>
                <ul className={styles.section} aria-labelledby="settings-button">
                    <li className={styles.title}>
                        Format
                    </li>
                    <li className={styles.item}>
                        <div className='inline-flex items-center' onClick={() => onSetFormat(UidFormat.HEX)}>
                            {props.currentFormat === UidFormat.HEX && <IconCheck className='mr-2' />}
                            Hexadecimal
                        </div>
                    </li>
                    <li className={styles.item}>
                        <div className='inline-flex items-center' onClick={() => onSetFormat(UidFormat.DEC)}>
                            {props.currentFormat === UidFormat.DEC && <IconCheck className='mr-2' />}
                            Decimal
                        </div>
                    </li>
                </ul>

                <ul className={styles.section} aria-labelledby="settings-button">
                    <li className={styles.title}>
                        Actions
                    </li>
                    <li className={styles.item}>
                        <div className='inline-flex items-center' onClick={onClearAll}>
                            <IconClearAll className='mr-2' />
                            Clear
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SettingsButton;