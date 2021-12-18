const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statisticSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    totalPlayTime: {
        type: Number,
        required: true
    }
});

const Statistic = mongoose.model("Statistic", statisticSchema);

module.exports = Statistic;