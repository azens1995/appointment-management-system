export const HttpError = {
  Invalid: (message: string) => {
    return {
      status: 400,
      data: {
        message: message
      }
    };
  },

  Forbidden: (message: string) => {
    return {
      status: 403,
      data: {
        message: message
      }
    };
  },

  NotFound: (message: string) => {
    return {
      status: 404,
      data: {
        message: message
      }
    };
  },

  Conflict: (message: string) => {
    return {
      status: 409,
      data: {
        message: message
      }
    };
  },

  BadRequest: (message: string) => {
    return {
      status: 500,
      data: {
        message: message
      }
    };
  }
};

export const HttpSuccess = {
  OK: (data: object) => {
    return {
      status: 200,
      data: data
    };
  },

  Created: (data: object) => {
    return {
      status: 201,
      data: data
    };
  },

  Accepted: (data: object) => {
    return {
      status: 202,
      data: data
    };
  }
};
