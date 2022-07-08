/*
 * @Author: Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyirght: 2016-2022 Wolfgang Kowarschick
 * @license: MIT
 */

import type TStringRecord from "./TStringRecord";
import type TErrorMessages from "./TErrorMessages";

type TConfig = {
  apiRoot: string;
  paths: TStringRecord;
  constraintErrorMessages: TErrorMessages;
};

export default TConfig;
