export const logger = {
    logLevel: 3,
    trace: (str: string) => {
        if (logger.logLevel <= 1) {
            console.log(str)
        }
    },
    debug: (str: string) => {
        if (logger.logLevel <= 2) {
            console.log(str);
        }
    },
    info: (str: string) => {
        if (logger.logLevel <= 3) {
            console.log(str);
        }
    },
    warning: (str: string) => {
        if (logger.logLevel <= 4) {
            console.log(str);
        }
    }
}
