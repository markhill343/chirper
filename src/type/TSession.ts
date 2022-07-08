/*
 * @Author: Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyirght: 2016-2022 Wolfgang Kowarschick
 * @license: MIT
 */

import type TErrorMessage from "./TErrorMessage";

type TSession = {
  token: string | null;
  errorMessage: TErrorMessage;
  isAdmin: boolean;
};

export default TSession;
