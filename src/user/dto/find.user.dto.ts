import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class FindUserDto {
  @ApiModelProperty()
  firstName: string;
  @ApiModelProperty()
  lastName: string;
  @ApiModelProperty()
  specialty: string;
}
