import GeneralException from "@/global/error/generalException";

class BadGatewayException extends GeneralException {
  constructor(message: string = 'Bad Gateway') {
    super();
    this.statusCode = 502;
    this.message = message;
  }
}

export default BadGatewayException;