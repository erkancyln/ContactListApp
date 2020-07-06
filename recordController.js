
const mongoose = require('mongoose');
const moment = require('moment');


const recordsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  listing_url: String,
  name: String,
  summary: String,
  accommodates: Number,
  bedrooms: Number,
  beds: Number,
  bathrooms: Number,
  amenities: [String],
  price: Number,
  monthly_price: Number,
  weekly_price: Number,
  security_deposit: Number,
  cleaning_fee: Number,
  space: String,
  neighborhood_overview: String,
  notes: String,
  transit: String,
  access: String,
  interaction: String,
  reviews_score: Number,
  review_scores_rating: Number,
  review_scores_location: Number,
  review_scores_cleanline: Number,
  reviewer_name: String,
  images:[String],
  picture_url:String,
  reviews: [String],
  reviewer_name:String,
  comments:String,
  date:{
    type: Date,
    default: Date.now},
  last_scraped: {
      type: Date,
      default: Date.now,
  },
});
const recordSchema = mongoose.model('Records' ,recordsSchema, 'listingsAndReviews');


module.exports = class RecordController {
  static async getRecords(req, res) {
    try {
      const {
        startDate,
        endDate,
        _id
      } = req.body;

      let records = [];
      const responseObjSructure =  {
        _id: true,
        listing_url: true,
        name: true,
        summary: true,
        accommodates: true,
        bedrooms: true,
        beds: true,
        bathrooms: true,
        amenities: true,
        price: true,
        monthly_price: true,
        weekly_price: true,
        security_deposit: true,
        cleaning_fee: true,
        space: true,
        neighborhood_overview: true,
        notes: true,
        transit: true,
        access: true,
        interaction: true,
        last_scraped: true,
        images: true,
        host: true,
        host_name: true,
        host_location: true,
        host_picture_url:true,
        // address: true,
        review_score: true,
        review_scores_rating: true,
        review_scores_location: true,
        review_scores_cleanline: true,
        picture_url:true,
        reviews: true,
        reviewer_name:true,
        date:true,
        comments:true,
      };

      if (startDate && endDate) {
        console.log("start date: ", moment(startDate, 'YYYY-MM-DD').add(1, 'day').toDate());
        console.log("end date: ", moment(endDate, 'YYYY-MM-DD').add(1, 'day').toDate());
        records = await recordSchema.aggregate([
          {
            $project: responseObjSructure,          
          },
          { 
            $match: {
              last_scraped: {
                $gte: moment(startDate, 'YYYY-MM-DD').add(1, 'day').toDate(),
                $lte: moment(endDate, 'YYYY-MM-DD').add(1, 'day').toDate()
              }
            }
          },
        ]);
      } else if (_id) {
        records = await recordSchema.aggregate([
          {
            $project: responseObjSructure,          
          },
          { 
            $match: {_id}
          },
        ]);
      } else {
        res.status(400);
        res.send({ code: 2, msg: "Required Params are missing in body!", records: []});
        return;
      }
      
      if (!records.length) {
        res.status(404);
        return res.send({code: 1, msg: 'Can not find any record with given parameters!', records});
      }
      res.status(200);
      res.send({code: 0, msg: 'Success', records});
    }
    catch (err) { 
      console.error(err.message);
      res.status(500);
      res.send({ code: -1, msg: "internal server error, error is ; " + err.message, records: []});  
    }
  }
};