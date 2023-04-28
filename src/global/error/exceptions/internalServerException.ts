import GeneralException from "@/global/error/generalException";

class InternalServerException extends GeneralException {
  constructor(message?: string) {
    super();
    this.statusCode = 500;
    this.message = message ?? 'Internal Server Error';
  }
}

export default InternalServerException;