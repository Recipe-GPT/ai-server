class GeneralException {
  statusCode: number;
  message: string; 
  constructor() {
      this.statusCode = 500;
      this.message = 'Internal Server Error';
  }
}

export default GeneralException;