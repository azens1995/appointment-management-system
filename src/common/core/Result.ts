import logger from '@utils/logger';

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: T | string;
  private data: T;

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.data = value;

    Object.freeze(this);
  }

  public getData(): T {
    if (this.isFailure) {
      logger.error(this.error);
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }
    return this.data;
  }

  public getErrorData(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }
}
