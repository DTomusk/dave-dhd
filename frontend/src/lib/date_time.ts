export default function FormatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: undefined,
        hour12: false,
    };

    return date.toLocaleString(undefined, options);
}