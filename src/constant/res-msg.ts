const AUTH = {
  NOT_EXIST: '존재하지 않는 회원입니다.',
  INVALID: '존재하지 않는 유저 혹은 권한이 없음.',
  ALREADY_EXIST: '이미 존재하는 회원입니다.',
  MISMATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
  NOT_VERIFIED: '유효하지 않은 토큰',
} as const;

const SERVER = {
  UNKNOWN: '서버 내부 오류',
} as const;

const RES_MSG = {
  AUTH,
  SERVER,
};

export default RES_MSG;
