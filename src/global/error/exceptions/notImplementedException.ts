import GeneralException from "@/global/error/generalException";

class NotImplementedException extends GeneralException {
  constructor(message?: string) {
    super();
    this.statusCode = 501;
    this.message = message ?? 'Not Implemented';
  }
}

export default NotImplementedException;