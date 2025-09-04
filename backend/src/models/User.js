const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'university', 'admin'], default: 'student' },
  profile: { 
    nom: String, 
    prenom: String, 
    telephone: String, 
    ville: String 
  },
  universityInfo: {
    universityName: String,
    universityCity: String,
    universityDescription: String,
    universityWebsite: String,
    universityPhone: String
  },
  status: { type: String, enum: ['active', 'pending', 'suspended'], default: 'pending' }
}, { timestamps: true });

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);