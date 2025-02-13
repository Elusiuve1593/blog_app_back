import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    type: String,
    example: 'This is the post title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Content of the post',
    type: String,
    example: 'This is the content of the post',
  })
  @IsString()
  content: string;
}
