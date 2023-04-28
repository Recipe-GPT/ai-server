import GeneralException from "@/global/error/generalException";

class UnAuthorizedException extends GeneralException {
  constructor(message?: string) {
    super();
    this.statusCode = 401;
    this.message = message ?? 'UnAuthorized';
  }
}

export default UnAuthorizedException;