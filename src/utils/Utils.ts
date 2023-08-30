export default class Utils {
    public static convertDateToFolderName(): string {
        const date = new Date();
        const millis = Date.parse(date.toISOString());
        const offset = date.getTimezoneOffset() * 60_000; // minutes to milliseconds
        const offsetIsoDate = new Date(millis - offset).toISOString();
        const trimmedDate = offsetIsoDate.substring(0, offsetIsoDate.lastIndexOf('.')); // remove millis and zulu
        return trimmedDate.replaceAll(':', '_');
    }
}
