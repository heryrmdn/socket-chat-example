import logger from "./logger.util"

export const ErrorHandler = () => {
  const handleFatalError = (err: any) => {
    logger.error(err)
    process.exit(1)
  }

  return {
    handleFatalError,
  }
}
