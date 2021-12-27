const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    cmdtyID : {   
        type: String,
        required: [true, 'Commodity ID is required'],
    },
    marketID : {
        type: String,
        required: [true, 'Market ID is required'],
    },
    cmdtyName : {   
        type: String
    },
    marketName : {
        type: String,
    },
    marketType : {
        type: String,
    },
    userID: {
        type: [String],
        required: [true, 'User ID is required'],
        validate: v => Array.isArray(v) && v.length > 0,
    },
    timestamp : {
        type: Number,
		default: Date.now()
    },
    priceUnits : {
        type : String,
        default : "Kg"
    },
    convFctr : {
        type : Number,
        default : 100,
        required : [true, 'Conversion factor is required']
    },
    minPrice : {
        type : Number,
        required : [true, "Minimum price is required"]
    },
    maxPrice : {
        type : Number,
        required : [true, "Maximum price is required"]
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;