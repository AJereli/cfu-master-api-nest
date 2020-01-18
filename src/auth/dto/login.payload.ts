import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LoginPayload {
  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

}
