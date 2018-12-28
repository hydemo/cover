export enum ApiErrorCode {
  TIMEOUT = -1, // 系统繁忙
  SUCCESS = 0, // 成功
  ACCOUNT_INVALID = 10002,
  PASSWORD_INVALID = 10003,
  USER_ID_INVALID = 10001, // 用户id无效
}