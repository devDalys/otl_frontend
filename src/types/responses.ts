export type SuccessResponse<T> = {
  body: T;
  msg: string;
  status: number;
};

export type BadResponse = {
  msg: string;
  validationResults?: Record<string, string>;
};
