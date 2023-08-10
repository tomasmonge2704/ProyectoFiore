/** @type {import('next').NextConfig} */
require("dotenv").config

const nextConfig = {
  env:{
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    CLAVE_TOKEN: process.env.CLAVE_TOKEN,
    API_URL: process.env.API_URL
  }
}

module.exports = nextConfig
