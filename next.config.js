/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  api: {
    externalResolver: true,
  },
};

module.exports={
  env:{
    "BASE_URL": "http://localhost:3000",
    "MONGODB_URL":"mongodb+srv://aditya4sure:NewPassword@casino.0r9lzep.mongodb.net/?retryWrites=true&w=majority",
    "ACCESS_TOKEN_SECRET":"2MqS&V^f_&UudgstXMbnd3LTdC_zkSzBYVB#Q=9%Rjm&fFBW6zTE3^s646kJ",
    "REFRESH_TOKEN_SECRET":"S%=VY!nj3rkK@?VZ_v?bQVFzhz^rSA#vKgJ4Rb23j_XCjQXU?fY9AmA-MgJWHae9f*Xz%P*x$WaGT*7c8HM67B-R%Z_zcy"
  }
}