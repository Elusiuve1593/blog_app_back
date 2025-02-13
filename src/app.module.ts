import { DatabaseConfigureModule } from './db/db-config.module';
import { HealthCheckController } from './health-check.controller';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { CommentModule } from './modules/comments/coomments.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseConfigureModule,
    UserModule,
    PostModule,
    CommentModule,
    CloudinaryModule,
  ],
  controllers: [HealthCheckController]
})
export class AppModule {}
