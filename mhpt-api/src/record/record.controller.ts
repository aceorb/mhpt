import { Request, Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { RecordService } from "./record.service";
import { CreateRecordDto } from "./dto/create-record.dto";
import { SuccessResponse } from "../common/models/success-response";
import { Record } from "./entities/record.entity";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller('')
export class RecordController {
  constructor(
    private readonly recordService: RecordService,
    private readonly userService: UserService,
  ) {}

  @Post('/log')
  @UseGuards(JwtAuthGuard)
  async create(@Request() request, @Body() payload: CreateRecordDto): Promise<SuccessResponse> {
    const user: User = await this.userService.findUserById(request.user.id);
    await this.recordService.create(user, payload);
    return {
      success: true,
      message: 'Daily Log Submit Successfully'
    };
  }

  @Get('/logs')
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() request): Promise<Record[]> {
    const user: User = await this.userService.findUserById(request.user.id);
    return this.recordService.findByUser(user);
  }
}
