export declare const enum LogType {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
}
export declare const enum Colors {
    BG_DARK_GRAY = "\u001B[48;5;240m",
    BG_CORN_FLOWER_BLUE = "\u001B[48;5;18m",
    BG_DARK_ORANGE = "\u001B[48;5;208m",
    BG_DARK_RED = "\u001B[48;5;88m",
    BLACK = "\u001B[30m",
    RED = "\u001B[31m",
    GREEN = "\u001B[32m",
    YELLOW = "\u001B[33m",
    BLUE = "\u001B[34m",
    MAGENTA = "\u001B[35m",
    CYAN = "\u001B[36m",
    WHITE = "\u001B[37m"
}
export declare const enum DateFormat {
    YEAR_MONTH_DAY = 0,
    YEAR_DAY_MONTH = 1,
    DAY_MONTH_YEAR = 2,
    DAY_YEAR_MONTH = 3,
    MONTH_DAY_YEAR = 4,
    MONTH_YEAR_DAY = 5
}
type LeucineConfiguration = {
    debugColor?: Colors;
    infoColor?: Colors;
    warnColor?: Colors;
    errorColor?: Colors;
    displayDate?: boolean;
    dateFormat?: DateFormat;
    displayTime?: boolean;
    showMilliseconds?: boolean;
    displayArgTypes?: boolean;
};
declare class Leucine {
    private debugColor;
    private infoColor;
    private warnColor;
    private errorColor;
    private displayDate;
    private dateFormat;
    private displayTime;
    private showMilliseconds;
    private displayArgTypes;
    constructor(config?: LeucineConfiguration);
    /**
     * Recommended usage by power users only. For everyone else, use built in #set<type>() methods in builder pattern.
     * @param {LeucineConfiguration} config
     * @returns
     */
    configure(config: LeucineConfiguration): void;
    private getDateStringified;
    private getTimeStringified;
    private log;
    error<T>(arg: T | T[]): this;
    debug<T>(arg: T | T[]): this;
    info<T>(arg: T | T[]): this;
    warn<T>(arg: T | T[]): this;
}
export declare const configure: (config: LeucineConfiguration) => void;
export declare const error: <T>(arg: T | T[]) => Leucine;
export declare const debug: <T>(arg: T | T[]) => Leucine;
export declare const info: <T>(arg: T | T[]) => Leucine;
export declare const warn: <T>(arg: T | T[]) => Leucine;
export default Leucine;
