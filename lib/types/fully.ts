export interface IFully {
    bind: (eventName: string, code: string) => void;

    nfcScanStart: () => boolean;
    nfcScanStop: () => boolean;
};