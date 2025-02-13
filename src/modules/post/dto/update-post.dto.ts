import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Title of the post',
    type: String,
    example: 'Updated post title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Content of the post',
    type: String,
    example: 'Updated content of the post',
  })
  @IsString()
  content: string;
}
