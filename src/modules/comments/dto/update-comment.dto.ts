import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    maxLength: 300,
    example: 'This is a sample comment.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  content: string;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
