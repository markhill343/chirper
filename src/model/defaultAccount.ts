import type TAccount from "../type/TAccount";

const defaultAccount = (): TAccount => {
  return {
    name: undefined,
    username: "",
    password: undefined,
    mail: undefined,
    bio: undefined,
    location: undefined,
    profilImage: undefined,
  };
};

export default defaultAccount;
