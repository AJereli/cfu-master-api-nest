import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SourcesDto {
  @ApiModelProperty()
  link: string;
}
