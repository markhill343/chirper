/*
 * @Author: Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyirght: 2016-2022 Wolfgang Kowarschick
 * @license: MIT
 */

type TErrorMessage =
  | { properties: Array<string>; message: string | null }
  | null
  | undefined;

export default TErrorMessage;
