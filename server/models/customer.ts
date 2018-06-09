module.exports = function () {
  const mongoose = require('mongoose');
  const validate = require('mongoose-validator');

  const first_nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'First Name should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
      validator: 'isAlphanumeric',
      message: 'First Name should contain alpha-numeric characters only'
    })
  ];
  const last_nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'Last Name should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
      validator: 'isAlphanumeric',
      message: 'Last Name should contain alpha-numeric characters only'
    })
  ];

  mongoose.Error.messages.String.required = "Your custom message @@@@.";


  const CustomerSchema = new mongoose.Schema({
    first_name: { type: String, required: true, validate: first_nameValidator },
    last_name: { type: String, required: true, validate: last_nameValidator },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });

  mongoose.model('Customer', CustomerSchema);
}
