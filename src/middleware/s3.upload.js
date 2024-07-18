const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const { ACCESSKEY, SECRETKEY, REGION, BUCKETNAME } = require('../configs/awsS3.config');


const S3 = new AWS.S3({
    accessKeyId: ACCESSKEY,
    secretAccessKey: SECRETKEY,
    region: REGION, 
});

const upload = multer({
    storage: multerS3({
        s3: S3,
        bucket: BUCKETNAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            if (file.fieldname === "singlefile") {
                cb(null, "single/" + file.originalname);

            } else if (file.fieldname === "multiplefiles") {
                // cái này để up nhiều ảnh một lần mà trong dự án này không dùng
                // để đây sau này có mở rộng thì sẽ dùng
                cb(null, "multiple/" + file.originalname);
            }
        }
    })
});

module.exports = upload.fields([
    {
        name: 'singlefile', maxCount: 1
    },
    {
        name: 'multiplefiles', maxCount: 5
    }
]);
