import { User } from '../../user/entity/user.entity';
import { Comment } from '../../comments/entity/comment.entity';

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  author: Omit<User, 'password' | 'blacklistedTokens'>;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GetPostsResponse {
  data: PostResponse[];
  total: number;
  page: number;
  totalPages: number;
}
