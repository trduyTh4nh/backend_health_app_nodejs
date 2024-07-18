const upload = require('../middleware/s3.upload');

class S3Service {
    static uploadFileToS3 = async (req, res) => {
        return new Promise((resolve, reject) => {
            
            upload(req, res, function (err) {
                if (err) {
                    console.error("Upload error:", err);
                    return reject(err);
                }
                console.log("Upload success");
                resolve({
                    result: 1,
                    message: "Uploaded successfully!",
                    files: req.files 
                });
            });
        });
    }
}

module.exports = S3Service;
