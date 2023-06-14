declare namespace API {
  type BaseResponse = {
    code?: number;
    data?: Record<string, any>;
    description?: string;
    message?: string;
  };

  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    description?: string;
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: number;
    description?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    description?: string;
    message?: string;
  };

  type CarSpaceCreateRequest = {
    imageUrl?: string;
    location?: string;
    price?: number;
    timeSlots?: Record<string, any>;
  };

  type CarSpaceUpdateRequest = {
    carId?: number;
    imageUrl?: string;
    location?: string;
    price?: number;
    timeSlots?: Record<string, any>;
  };

  type IdRequest = {
    id?: number;
  };

  type ModelAndView = {
    empty?: boolean;
    model?: Record<string, any>;
    modelMap?: Record<string, any>;
    reference?: boolean;
    status?:
      | 'ACCEPTED'
      | 'ALREADY_REPORTED'
      | 'BAD_GATEWAY'
      | 'BAD_REQUEST'
      | 'BANDWIDTH_LIMIT_EXCEEDED'
      | 'CHECKPOINT'
      | 'CONFLICT'
      | 'CONTINUE'
      | 'CREATED'
      | 'DESTINATION_LOCKED'
      | 'EXPECTATION_FAILED'
      | 'FAILED_DEPENDENCY'
      | 'FORBIDDEN'
      | 'FOUND'
      | 'GATEWAY_TIMEOUT'
      | 'GONE'
      | 'HTTP_VERSION_NOT_SUPPORTED'
      | 'IM_USED'
      | 'INSUFFICIENT_SPACE_ON_RESOURCE'
      | 'INSUFFICIENT_STORAGE'
      | 'INTERNAL_SERVER_ERROR'
      | 'I_AM_A_TEAPOT'
      | 'LENGTH_REQUIRED'
      | 'LOCKED'
      | 'LOOP_DETECTED'
      | 'METHOD_FAILURE'
      | 'METHOD_NOT_ALLOWED'
      | 'MOVED_PERMANENTLY'
      | 'MOVED_TEMPORARILY'
      | 'MULTIPLE_CHOICES'
      | 'MULTI_STATUS'
      | 'NETWORK_AUTHENTICATION_REQUIRED'
      | 'NON_AUTHORITATIVE_INFORMATION'
      | 'NOT_ACCEPTABLE'
      | 'NOT_EXTENDED'
      | 'NOT_FOUND'
      | 'NOT_IMPLEMENTED'
      | 'NOT_MODIFIED'
      | 'NO_CONTENT'
      | 'OK'
      | 'PARTIAL_CONTENT'
      | 'PAYLOAD_TOO_LARGE'
      | 'PAYMENT_REQUIRED'
      | 'PERMANENT_REDIRECT'
      | 'PRECONDITION_FAILED'
      | 'PRECONDITION_REQUIRED'
      | 'PROCESSING'
      | 'PROXY_AUTHENTICATION_REQUIRED'
      | 'REQUESTED_RANGE_NOT_SATISFIABLE'
      | 'REQUEST_ENTITY_TOO_LARGE'
      | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
      | 'REQUEST_TIMEOUT'
      | 'REQUEST_URI_TOO_LONG'
      | 'RESET_CONTENT'
      | 'SEE_OTHER'
      | 'SERVICE_UNAVAILABLE'
      | 'SWITCHING_PROTOCOLS'
      | 'TEMPORARY_REDIRECT'
      | 'TOO_EARLY'
      | 'TOO_MANY_REQUESTS'
      | 'UNAUTHORIZED'
      | 'UNAVAILABLE_FOR_LEGAL_REASONS'
      | 'UNPROCESSABLE_ENTITY'
      | 'UNSUPPORTED_MEDIA_TYPE'
      | 'UPGRADE_REQUIRED'
      | 'URI_TOO_LONG'
      | 'USE_PROXY'
      | 'VARIANT_ALSO_NEGOTIATES';
    view?: View;
    viewName?: string;
  };

  type User = {
    insertTime?: string;
    isDelete?: number;
    nickName?: string;
    updateTime?: string;
    userAccount?: string;
    userCredit?: number;
    userId?: number;
    userPassword?: string;
    userPhone?: string;
    userRole?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userCheckPassword?: string;
    userPassword?: string;
    userPhone?: string;
  };

  type UserUpdateRequest = {
    nickName?: string;
    userNewPassword?: string;
    userPhone?: string;
  };

  type View = {
    contentType?: string;
  };
}
