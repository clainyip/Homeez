const mongoose = require("mongoose");
Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);


const informationSchema = new mongoose.Schema({
  xid: Number,
  table_info: String,
  table_valid: {
    type: Boolean,
    default: true
  },
});

informationSchema.plugin(AutoIncrement, {inc_field: 'xid'});

const Info = mongoose.model("Info", informationSchema);

module.exports = Info;
