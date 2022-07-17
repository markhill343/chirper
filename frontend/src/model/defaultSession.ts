import type TSession from "../type/TSession";

const defaultSession = (): TSession => {
  return {
    token: null,
    errorMessage: null,
    isAdmin: false,
  };
};

export default defaultSession;
