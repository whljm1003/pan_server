require('dotenv').config();
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'picanote.me',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        // metadata: function (req, file, cb) {
        //     cb(null, { fieldName: file.fieldname });
        // },
        key: function (req, file, cb) {
            cb(null, `uploads/${Date.now()}_${file.originalname}`)
        }
    })
}) // S3로 이미지 업로드(그림일기)

const profileUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'picanote.me',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        // metadata: function (req, file, cb) {
        //     cb(null, { fieldName: file.fieldname });
        // },
        key: function (req, file, cb) {
            cb(null, `upload/${Date.now()}_${file.originalname}`)
        }
    })
}) // S3로 이미지 업로드

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, './uploads/');
//         },
//         filename: (req, file, cb) => {
//             const ext = path.extname(file.originalname);
//             cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//         },
//     }),
//     limits: { fileSize: 5 * 1024 * 1024 },
// }); // 이미지 업로드 로컬 테스트용(업로드 시 로컬에 이미지 파일이 저장됨)

exports.upload = upload;
exports.profileUpload = profileUpload;