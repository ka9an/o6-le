const levelIndicators = {
    debug: `🐛 `,
    info: `ℹ️  `,
    warn: `⚠️  `,
    error: `⛔️ `,
};
class Leucine {
    debugColor = "\u001B[48;5;240m" /* Colors.BG_DARK_GRAY */;
    infoColor = "\u001B[48;5;18m" /* Colors.BG_CORN_FLOWER_BLUE */;
    warnColor = "\u001B[48;5;208m" /* Colors.BG_DARK_ORANGE */;
    errorColor = "\u001B[48;5;88m" /* Colors.BG_DARK_RED */;
    displayDate = true;
    dateFormat = 4 /* DateFormat.MONTH_DAY_YEAR */;
    displayTime = true;
    showMilliseconds = false;
    displayArgTypes = false;
    constructor(config) {
        if (config) {
            this.configure(config);
        }
    }
    /**
     * Recommended usage by power users only. For everyone else, use built in #set<type>() methods in builder pattern.
     * @param {LeucineConfiguration} config
     * @returns
     */
    configure(config) {
        const keys = Object.keys(config);
        if (keys.length === 0)
            throw new Error("Cannot confire Leucine with zero configuration options!");
        for (const key of keys) {
            Object.assign(this, {
                [key]: config[key],
            });
        }
    }
    getDateStringified(inDate) {
        const date = inDate ?? new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        switch (this.dateFormat) {
            case 2 /* DateFormat.DAY_MONTH_YEAR */:
                return `${day}/${month}/${year}`;
            case 3 /* DateFormat.DAY_YEAR_MONTH */:
                return `${day}/${year}/${month}`;
            case 4 /* DateFormat.MONTH_DAY_YEAR */:
                return `${month}/${day}/${year}`;
            case 5 /* DateFormat.MONTH_YEAR_DAY */:
                return `${month}/${year}/${day}`;
            case 1 /* DateFormat.YEAR_DAY_MONTH */:
                return `${year}/${day}/${month}`;
            case 0 /* DateFormat.YEAR_MONTH_DAY */:
                return `${year}/${month}/${day}`;
        }
    }
    getTimeStringified(inDate) {
        const date = inDate ?? new Date();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const milliseconds = this.showMilliseconds
            ? date.getMilliseconds().toString().padStart(3, "0")
            : "";
        return `${hours}:${minutes}:${seconds}${this.showMilliseconds ? ":" : ""}${milliseconds}`;
    }
    log(arg, level = "debug" /* LogType.DEBUG */) {
        const backgroundColor = this[`${level}Color`];
        const indicator = levelIndicators[level];
        const fileName = import.meta.file ?? import.meta.url;
        const inDate = this.displayDate || this.displayTime ? new Date() : null;
        const date = this.displayDate
            ? `${this.getDateStringified(inDate)}`
            : "";
        const time = this.displayTime
            ? ` ${this.getTimeStringified(inDate)}`
            : "";
        const argTypes = this.displayArgTypes
            ? `| ${Array.isArray(arg)
                ? `[${arg.map((x) => (typeof x).toString()).join(", ")}]`
                : (typeof arg).toString()}`
            : "";
        console.log(`\x1b[1m${backgroundColor}${indicator}[${date}${time}] (${level}) in ${fileName}\x1b[0m\n\n`, ...(Array.isArray(arg) ? [...arg] : [arg]), argTypes, "\n");
        return this;
    }
    error(arg) {
        this.log(arg, "error" /* LogType.ERROR */);
        return this;
    }
    debug(arg) {
        this.log(arg, "debug" /* LogType.DEBUG */);
        return this;
    }
    info(arg) {
        this.log(arg, "info" /* LogType.INFO */);
        return this;
    }
    warn(arg) {
        this.log(arg, "warn" /* LogType.WARN */);
        return this;
    }
}
const leucine = new Leucine();
export const configure = leucine.configure.bind(leucine);
export const error = leucine.error.bind(leucine);
export const debug = leucine.debug.bind(leucine);
export const info = leucine.info.bind(leucine);
export const warn = leucine.warn.bind(leucine);
export default Leucine;
