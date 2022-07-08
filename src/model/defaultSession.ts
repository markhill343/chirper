/*
 * @Author: Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyirght: 2016-2022 Wolfgang Kowarschick
 * @license: MIT
 */

import type TSession from "../type/TSession";

const defaultSession = (): TSession => {
  return {
    token: null,
    errorMessage: null,
    isAdmin: false,
  };
};

export default defaultSession;
