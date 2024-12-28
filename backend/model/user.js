import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  avatar: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, default: 'I am new!' },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  createdAt: { type: Date, default: Date.now },

});

userSchema.methods.updateStatus = async function (newStatus) {
  console.log(newStatus);
  this.status = newStatus;
  await this.save();
}



const User = mongoose.model('User', userSchema);

export default User;


