import mongoose from 'mongoose';

export interface IBlog extends mongoose.Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  publishedAt: Date;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [120, 'Title cannot be more than 120 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an excerpt'],
      maxlength: [300, 'Excerpt cannot be more than 300 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide the blog content'],
    },
    coverImage: {
      type: String,
      required: [true, 'Please provide a cover image URL (Cloudinary)'],
    },
    author: {
      type: String,
      required: [true, 'Please provide an author name'],
      default: 'Admin',
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from compiling the model multiple times in Next.js development mode
export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
