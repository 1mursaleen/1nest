import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';
import * as mongoose from 'mongoose';

import { AuthProvidersEnum } from '@/application/modules/authentication/auth/auth-providers.enum';
import { Role } from '@/application/modules/authorization/roles/entities/role.entity';
import { Status } from '@/application/modules/authorization/statuses/entities/status.entity';
import { FileEntity } from '@/application/modules/files/entities/file.entity';
import { EntityHelper } from '@/application/utils/entity-helper';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  id: mongoose.Types.ObjectId;

  @Prop({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Prop({ nullable: true, select: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @Prop({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Prop({ type: String, nullable: true, index: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId: string | null;

  @Prop({ type: String, nullable: true, index: true })
  firstName: string | null;

  @Prop({ type: String, nullable: true, index: true })
  lastName: string | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FileEntity',
    nullable: true,
  })
  photo?: FileEntity | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', nullable: true })
  role?: Role | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Status' })
  status?: Status;

  @Prop({ type: String, nullable: true, select: false, index: true })
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware function to load the previous password
UserSchema.pre('find', function (next) {
  this.populate('photo'); // Populate any referenced documents if needed
  this.populate('role'); // Populate any referenced documents if needed
  this.populate('status'); // Populate any referenced documents if needed

  this.where({}).select('+password'); // Include the password field in query results
  next();
});

// Middleware function to hash the password before insert or update
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Custom method to update the document and load previous password
UserSchema.methods.updateWithPreviousPassword = async function (update) {
  if (update.password) {
    // Fetch the current user to get the previous password
    const user = await this.model('User')
      .findOne({ _id: this._id })
      .select('+password');

    if (user) {
      this.previousPassword = user.password;
    }
  }

  return this.updateOne(update);
};
