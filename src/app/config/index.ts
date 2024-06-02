import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV : process.env.NODE_ENV ,
  port : process.env.PORT,
  databaseURL : process.env.DASATABE_URL,
  bcrypt : process.env.bcrypt,
  defoult_pasword:process.env.defoult_pasword
};
