import GeneralException from "@/global/error/generalException";

export interface ErrorField {
  [index: string]: string
};

class BadRequestException extends GeneralException {
  fileds: ErrorField;
  constructor(fields: ErrorField) {
    super();
    this.statusCode = 400;
    this.message = 'Bad Request';
    this.fileds = fields;
  }
}

export default BadRequestException;