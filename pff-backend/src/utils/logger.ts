//loggers to log info and error messages to the console
//if the environment is not test, to see the logs in production

const info = (...params: string[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(...params)
    }
}

const error = (...params: string[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.error(...params)
    }
}

const logger = {
    info,
    error,
}

export default logger
