import GeneralException from "@/global/error/generalException";

class ConflictException extends GeneralException {
  constructor(message?: string) {
    super();
    this.statusCode = 409;
    this.message = message ?? 'Conflict';
  }
}

export default ConflictException;