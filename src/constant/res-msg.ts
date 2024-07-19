const AUTH = {
  NOT_EXIST: '존재하지 않는 회원입니다.',
  ALREADY_EXIST: '이미 존재하는 회원입니다.',
  MISMATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
} as const;

const SERVER = {
  UNKNOWN: '서버 내부 오류',
} as const;

const RES_MSG = {
  AUTH,
  SERVER,
};

export default RES_MSG;
