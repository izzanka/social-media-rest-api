import bcrypt from "bcrypt";

export const hash = async (data, salt = 10) => {
  try {
    return await bcrypt.hash(data, salt);
  } catch (err) {
    console.log(err);
  }
};
