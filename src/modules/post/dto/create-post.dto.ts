import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Content of the post',
    type: String,
    example: 'This is the content of the post',
  })
  @MaxLength(300)
  @IsString()
  content: string;
}
