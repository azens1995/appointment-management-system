import { Response } from 'express';
import { AppError, HttpCode } from './appError';
import { Result } from '@common/core/Result';
import logger from '@/utils/logger';

export class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }

  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  private handleTrustedError(error: AppError, response: Response): void {
    const errorData = Result.fail(error.message);
    response.status(error.httpCode).json(errorData);
  }

  private handleCriticalError(error: Error, response?: Response): void {
    if (response) {
      const errorData = Result.fail('Internal server error');
      response.status(HttpCode.INTERNAL_SERVER_ERROR).json(errorData);
    }
    logger.warn('Application encountered a critical error. Exiting');
    process.exit(1);
  }
}

export const errorHandler = new ErrorHandler();
