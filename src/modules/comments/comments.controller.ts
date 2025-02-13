import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
  Query,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../user/jwt-auth.guard';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add a comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
    schema: {
      example: {
        id: 1,
        content: 'This is a comment',
        createdAt: '2025-02-12T10:00:00Z',
        updatedAt: '2025-02-12T10:00:00Z',
        userId: 1,
      },
    },
  })
  async addComment(@Request() req, @Body() body: CreateCommentDto) {
    return this.commentService.addComment(req.user, body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({
    status: 200,
    description: 'List of comments',
    schema: {
      example: {
        data: [
          {
            id: 1,
            content: 'This is a comment',
            createdAt: '2025-02-12T10:00:00Z',
            updatedAt: '2025-02-12T10:00:00Z',
            userId: 1,
          },
          {
            id: 2,
            content: 'This is another comment',
            createdAt: '2025-02-12T10:05:00Z',
            updatedAt: '2025-02-12T10:05:00Z',
            userId: 2,
          },
        ],
        total: 2,
        page: 1,
        totalPages: 1,
      },
    },
  })
  @Get()
  async getComments(@Query('postId') postId: number) {
    if (!postId) {
      throw new BadRequestException('Post ID is required');
    }
    return this.commentService.getComments(postId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get comment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The comment was found.',
    schema: {
      example: {
        id: 1,
        content: 'This is a comment',
        createdAt: '2025-02-12T10:00:00Z',
        updatedAt: '2025-02-12T10:00:00Z',
        userId: 1,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.',
  })
  async getCommentById(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getCommentById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully updated.',
    schema: {
      example: {
        id: 1,
        content: 'Updated comment content',
        createdAt: '2025-02-12T10:00:00Z',
        updatedAt: '2025-02-12T10:10:00Z',
        userId: 1,
      },
    },
  })
  async updateComment(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(req.user, id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
    schema: {
      example: {
        message: 'Comment deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.',
  })
  async deleteComment(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteComment(req.user, id);
  }
}
