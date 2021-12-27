const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const Report = require('./../models/reportModel');

exports.createReport = catchAsync(async (req,res, next) => {

    //console.log(req);
    if(!req.body.marketID && !req.body.cmdtyID){
        return next(new AppError("Please provide marketID and cmdtyID",400));
    }

    const report = await Report.findOne({
        marketID : req.body.marketID,
        cmdtyID : req.body.cmdtyID
    });
    //console.log(report);
    if(!report) {
        if(req.body.priceUnit) req.body.priceUnit = "kg";
        req.body.minPrice = req.body.minPrice / req.body.convFctr;
        req.body.maxPrice = req.body.maxPrice / req.body.convFctr;
        req.body.convFctr = 100;

        const report = await Report.create(req.body);

        res.status(201).json({
            status: "success",
            reportID: report._id
        });
    }
    else{
        report.minPrice = ((req.body.minPrice / req.body.convFctr) + report.minPrice) / 2;
        report.maxPrice = ((req.body.maxPrice / req.body.convFctr) + report.maxPrice) / 2;
        if(!report.userID.includes(req.body.userID))
            report.userID.push(req.body.userID);
        report.timestamp = Date.now();

        const rep = await report.save();

        res.status(201).json({
            status: "success",
            reportID: rep._id
        });
    }
});

exports.getReport = catchAsync(async (req,res,next) => {
    const report = await Report.find({cmdtyID : req.query.cmdtyID}).select('-__v -convFctr');
    if(report.length === 0) return next(new AppError("Record not found",404));
    res.status(200).json({
        report
    });
});