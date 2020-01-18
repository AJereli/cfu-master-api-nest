import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class AccessTokenDto {
  @ApiModelProperty()
  @IsString()
  accessToken: string;
  @ApiModelProperty()
  @IsString()
  expiresIn: string;
}
