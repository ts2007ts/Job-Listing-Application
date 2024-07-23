
const jobListingModel = require('../Models/jobListingModel');
const { createError, handleError } = require('../Errors/error');
const fs = require('fs');
var zip = require('express-zip');

exports.getAllJobs = async (req, res, next) => {
    const query = req.query;
    try {
        const jobs = await jobListingModel.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            status: "success",
            length: jobs.length,
            data: {
                jobs
            }
        })
    } catch (error) {
        handleError(createError(404, error.message), req, res, next);
    }
}

exports.getJob = async (req, res) => {
    try {
        const job = await jobListingModel.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                job
            }
        })
    } catch (error) {
        handleError(createError(404, error.message), req, res, next);
    }
}

exports.createJob = async (req, res, next) => {
    const { title, description, skills, salary, userId, location, type } = req.body;

    if (!title || !description || !skills || !salary || !userId || !location || !type) {
        return res.status(400).json(
            {
                status: "failed",
                message: 'All fields are required'
            }
        );
    }

    try {
        let job = new jobListingModel({
            title: title,
            description: description,
            salary: salary,
            userId: userId,
            skills: skills,
            location: location,
            type: type
        })
        //Check for files uploads
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                let path = req.files[i].path;
                job.filesPath.push(path);
            }
        }


        //save
        await job.save();

        return res.status(201).json({
            status: "success",
            message: "Job Created Successfully",
            data: {
                job
            }
        })
    } catch (error) {
        handleError(createError(404, error.message), req, res, next);
    }
}

exports.updateJob = async (req, res, next) => {
    try {
        console.log(req.body);
        const job = await jobListingModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        //Check for files uploads
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                let path = req.files[i].path;
                job.filesPath.push(path);
            }
        }

        //save
        await job.save();

        res.status(200).json({
            status: "success",
            message: "Job Updated Successfully",
            data: {
                job
            }
        })
    } catch (error) {
        handleError(createError(404, error.message), req, res, next);
    }
}

exports.deleteJob = async (req, res, next) => {
    try {

        const job = await jobListingModel.findByIdAndDelete(req.params.id);

        //check if there is files for this job to delete
        if (job.filesPath.length > 0) {
            let filesPath = job.filesPath;
            for (let i = 0; i < filesPath.length; i++) {
                if (fs.existsSync(filesPath[i])) {
                    fs.unlinkSync(filesPath[i], (err) => {
                        if (err) {
                            res.status(500).send({ message: "Could not delete the file. " + err });
                        } else {
                            res.status(200).send({ message: "File was deleted." });
                        }
                    });
                }

            }
        }


        res.status(200).json({
            status: "success",
            message: "Job Deleted successfully"
        })
    } catch (error) {
        handleError(createError(404, error.message), req, res, next);
    }
}

exports.downloadAttachments = async (req, res, next) => {
    try {
        const job = await jobListingModel.findById(req.params.id);

        const filesPath = job.filesPath;

        if (filesPath.length === 0) {
            return handleError(createError(404, "No Files to Download"), req, res, next);
        }

        let files = [];

        filesPath.forEach((path) => {
            let newPath = path.replace(/\\/g, "/");
            let fileName = newPath.replace("public/files/", "");
            files.push({ path: newPath, name: fileName });
        });

        res.zip(files);

    } catch (error) {
        handleError(createError(404, error.message), req, res, next);
    }
}

exports.deleteSingleFile = async (req, res, next) => {

    try {
        const job = await jobListingModel.findById(req.params.id);

        let fileToDelete = "public/files/" + req.params.file;

        if (!fileToDelete) {
            return handleError(createError(404, error.message), req, res, next);
        }

        const filesPath = job.filesPath;

        filesPath.forEach((path, index) => {
            let newPath = path.replace(/\\/g, "/");
            if (newPath === fileToDelete) {
                filesPath.splice(index, 1);
            }
        });

        fs.unlinkSync(fileToDelete, (err) => {
            if (err) {
                res.status(500).send({ message: "Could not delete the file. " + err });
            } else {
                res.status(200).send({ message: "File was deleted." });
            }
        });

        job.filesPath = filesPath;

        job.save();

        res.status(200).json({
            status: "success",
            message: "File Deleted successfully"
        })

    } catch (error) {
        handleError(createError(404, error.message), req, res, next);
    }
}

exports.downloadSingleFile = async (req, res, next) => {
    try {
        const job = await jobListingModel.findById(req.params.id);

        let fileToDownload = "public/files/" + req.params.file;

        if (!fileToDownload) {
            return handleError(createError(404, error.message), req, res, next);
        }

        const filesPath = job.filesPath;

        filesPath.forEach((path, index) => {
            let newPath = path.replace(/\\/g, "/");
            let fileName = newPath.replace("public/files/", "");
            if (newPath === fileToDownload) {
                res.download(fileToDownload);
            }
        });



    } catch (error) {
        handleError(createError(404, error.message), req, res, next);
    }
}