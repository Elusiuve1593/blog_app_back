import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../user/entity/user.entity';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Post } from '../post/entity/post.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async addComment(
    user: User,
    { content, postId }: CreateCommentDto,
  ): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentRepository.create({
      content,
      author: user,
      post,
    });

    await this.commentRepository.save(comment);
    return plainToClass(Comment, comment);
  }

  async getComments(): Promise<Comment[]> {
    const comments = await this.commentRepository.find();
    return plainToInstance(Comment, comments);
  }

  async getCommentById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return plainToClass(Comment, comment);
  }

  async updateComment(user: User, id: number, { content }: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.author.id !== user.id) {
      throw new HttpException('You are not allowed to edit this comment', 500);
    }

    comment.content = content;

    await this.commentRepository.save(comment);

    return plainToClass(Comment, comment);
  }

  async deleteComment(user: User, id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.author.id !== user.id) {
      throw new HttpException('You are not allowed to edit this comment', 500);
    }

    await this.commentRepository.delete({ id });

    return { message: 'Comment deleted successfully' };
  }
}
