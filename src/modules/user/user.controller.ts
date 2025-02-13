import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad request, validation failed' })
  @Post('sign-up')
  signup(@Body() body: SignUpDto) {
    return this.userService.signup(body);
  }

  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiResponse({ status: 200, description: 'User successfully signed in' })
  @ApiResponse({ status: 400, description: 'Bad request, validation failed' })
  @Post('sign-in')
  signin(@Body() body: SignInDto) {
    return this.userService.signin(body);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.logout(token, req.user.userId);
  }

  @ApiOperation({ summary: 'Get user information' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user information',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.getUser(token);
  }
}
