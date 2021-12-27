const mongoose = require('mongoose');

/* 
{
"reportDetails": {
"userID": "user-1",
"marketID": "market-1",
"marketName": "Vashi Navi Mumbai",
"cmdtyID": "cmdty-1",
"marketType": "Mandi",
"cmdtyName": "Potato",
"priceUnit": "Pack",
"convFctr": 50,
"minPrice": 700,
"maxPrice": 900,
}
*/

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
    userID: [
        {
            type: String,
            required: [true, 'User ID is required'],
        }
    ],
    timestamp : {
        type: Date,
		default: Date.now(),
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