const S3Service = require('../service/s3AWS.service');
const { SuccessResponse } = require('../core/success.response');

class UploadController {

    async uploadFile(req, res) {
        try {
            
            console.log("Request received");
            const result = await S3Service.uploadFileToS3(req, res);
            console.log("File uploaded");
            return res.status(200).json(new SuccessResponse({
                message: "Upload successfully!",
                metadata: result
            }));
            
        } catch (error) {
            console.error("Error uploading file", error);
            return res.status(500).json({
                message: "An error occurred",
                error: error.message
            });
        }
    }

}

module.exports = new UploadController();
