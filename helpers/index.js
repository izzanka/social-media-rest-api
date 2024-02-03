import bcrypt from "bcrypt";

export const hash = async (data, salt = 10) => {
  try {
    return await bcrypt.hash(data, salt);
  } catch (err) {
    console.log(err);
  }
};

export const responseSuccess = (msg, data = null) => {
  return {
    status: "success",
    message: msg,
    data: data,
  };
};

export const responseError = (msg) => {
  return {
    status: "error",
    message: msg,
  };
};
