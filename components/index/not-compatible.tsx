import Button from "../shared/button";

interface NotCompatibleProps {
    onRetry?: () => void;
    canRetry?: boolean;
};

const NotCompatible: React.FC<NotCompatibleProps> = (props: NotCompatibleProps) => {

    return (
        <>
            <p className='pb-4'>Your device or browser is not compatible 😥</p>

            {/* TODO: add a checklist of prerequisites? like: chrome ✔ android ✔ https ❌ */}

            <Button onClick={props.onRetry} className='inline-flex items-center' disabled={!props.canRetry}>
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5"></path>
                </svg>
                Retry
            </Button>
        </>
    );
};

export default NotCompatible;