const mongoose = require("mongoose");

const MockAiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mockId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    jobdescription:{
        type: String,
        required: true,
    },
    jobtitle: {
        type: String,
        required: true,
    },
    json_mock_response: {
        type: String,
        required: true,
      },
   jobexperience: {
    type: String,
    required: true,
   },
   
})
const MockAi = mongoose.model("MockAi", MockAiSchema);

module.exports = MockAi;