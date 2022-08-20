export class NdefMessage {
    constructor(serialNumber: string, records: ReadonlyArray<NDEFRecord>) {
        this.serialNumber = serialNumber;
        this.records = records;
        this.createdAt = new Date();
    }

    serialNumber: string;
    records: ReadonlyArray<NDEFRecord>;
    createdAt: Date;

    public isEmpty(): boolean {
        return this.records.length == 0 || (this.records.length == 1 && this.records[0].recordType === 'empty');
    }

    public toHex(): string {
        return this.serialNumber;
    }

    public toDec(): string {
        return parseInt(this.serialNumber.replaceAll(':', ''), 16).toString();
    }

    public getCreatedAtTime(): string {
        return this.createdAt.toLocaleTimeString();
    }

}