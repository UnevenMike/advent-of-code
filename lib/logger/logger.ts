// deno-lint-ignore-file no-explicit-any
export const logger = {
    logLevel: 3,
    trace: (str: any) => {
        if (logger.logLevel <= 1) {
            console.log(str)
        }
    },
    debug: (str: any) => {
        if (logger.logLevel <= 2) {
            console.log(str);
        }
    },
    info: (str: any) => {
        if (logger.logLevel <= 3) {
            console.log(str);
        }
    },
    warning: (str: any) => {
        if (logger.logLevel <= 4) {
            console.log(str);
        }
    }
}
