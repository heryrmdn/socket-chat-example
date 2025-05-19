import mg from 'morgan'
import logger from './logger.util'

const morgan = mg('dev', {
  stream: {
    write: message => {
      logger.info(message)
    }
  }
})

export default morgan