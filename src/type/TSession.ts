import type TErrorMessage from "./TErrorMessage";

type TSession = {
  token: string | null;
  errorMessage: TErrorMessage;
  isAdmin: boolean;
};

export default TSession;
