import GeneralException from "@/global/error/generalException";

export interface ErrorField {
  [index: string]: string
};

class BadRequestException extends GeneralException {
  fileds: ErrorField;
  constructor(
    message: string = 'Bad Request',
    fields: ErrorField = {}
  ) {
    super();
    this.statusCode = 400;
    this.message = message;
    this.fileds = fields;
  }
}

export default BadRequestException;