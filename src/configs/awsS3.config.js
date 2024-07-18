require('dotenv').config()

const ACCESSKEY = process.env.ACCESSKEY
const SECRETKEY = process.env.SECRETKEY
const REGION = process.env.REGION
const BUCKETNAME = process.env.BUCKETNAME

module.exports = {
    ACCESSKEY,
    SECRETKEY,
    REGION,
    BUCKETNAME
}


