import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../user/entity/user.entity';
import { plainToClass } from 'class-transformer';
import { GetPostsResponse } from '../post/types/posts';
import { Post } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(user: User, body: CreatePostDto): Promise<Post> {
    const { content } = body;

    const post = this.postRepository.create({
      content,
      author: user,
    });

    await this.postRepository.save(post);
    return plainToClass(Post, post);
  }

  async getPosts(page: number, limit: number): Promise<Post> {
    const [posts, total] = await this.postRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['author', 'comments'],
      order: { createdAt: 'DESC' },
    });

    const post = {
      data: posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };

    return plainToClass(Post, post);
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return plainToClass(Post, post);
  }

  async updatePost(user: User, id: number, body: UpdatePostDto): Promise<Post> {
    const { title, content } = body;

    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.id !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to update this post',
      );
    }

    post.content = content;

    await this.postRepository.save(post);

    return plainToClass(Post, post);
  }

  async deletePost(user: User, id: number): Promise<{ message: string }> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.id !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );
    }

    await this.postRepository.delete({ id });
    
    return { message: 'Post deleted successfully' };
  }
}
