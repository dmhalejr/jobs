import { formatError } from "graphql";

export default function defaultErrorFormatter(error) {
  const data = formatError(error);

  if (
    error.originalError &&
    error.originalError.result &&
    error.originalError.result.errors &&
    error.originalError.result.errors.length === 1
  ) {
    const originalError = error.originalError.result.errors[0];
    if (originalError.message === error.message) {
      if (originalError.code) {
        data.code = originalError.code;
      }
      if (originalError.requestId) {
        data.requestId = originalError.requestId;
      }
    }
  }

  return data;
}
