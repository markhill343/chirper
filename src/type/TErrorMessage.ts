type TErrorMessage =
  | { properties: Array<string>; message: string | null }
  | null
  | undefined;

export default TErrorMessage;
