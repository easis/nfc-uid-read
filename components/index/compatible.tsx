import ActionButton from "@/components/index/action-button";

import { useState } from "react";

interface CompatibleProps {

};

const Compatible: React.FC<CompatibleProps> = (props: CompatibleProps) => {

    const onMessage = (event: NDEFReadingEvent) => {
        console.log('🐱‍👤', 'Received NDEF', { uid: event.serialNumber, message: event.message });
    };

    return (
        <>
            {/* TODO: add a little description of what happens when you click the start button */}
            <ActionButton onMessageReceived={onMessage} />
        </>
    );
};

export default Compatible;