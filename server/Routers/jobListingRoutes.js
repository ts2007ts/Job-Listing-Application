const express = require('express');
const jobListingController = require('../Controllers/jobListingController');
const verifyToken = require('../Middleware/verifyToken');
const uploads = require('../Middleware/filesUpload');

const router = express.Router();


router.route('/')
    .get(jobListingController.getAllJobs)
    .post(verifyToken, uploads.any(), jobListingController.createJob);

router.route('/:id')
    .get(jobListingController.getJob)
    .patch(verifyToken, uploads.any(), jobListingController.updateJob)
    .delete(verifyToken, jobListingController.deleteJob);

router.route('/download/:id')
    .get(jobListingController.downloadAttachments);

router.route('/download/single/:file/:id')
    .get(jobListingController.downloadSingleFile)

router.route('/delete/single/:file/:id')
    .delete(jobListingController.deleteSingleFile)


module.exports = router;