import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class RegistrationDto {
  @ApiModelProperty()
  firstName: string;
  @ApiModelProperty()
  lastName: string;
  @ApiModelProperty()
  password: string;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  specialty: string;
  @ApiModelProperty()
  department: string;
  @ApiModelProperty()
  graduationTheme: string;
  @ApiModelProperty()
  scientificDirector: string;

}
