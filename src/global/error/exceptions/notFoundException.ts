import GeneralException from "@/global/error/generalException";

class NotFoundException extends GeneralException {
  constructor(message?: string) {
    super();
    this.statusCode = 404;
    this.message = message ?? 'Not Found';
  }
}

export default NotFoundException;