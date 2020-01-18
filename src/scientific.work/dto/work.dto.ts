import { Column } from 'typeorm';
import { KeyWordDto } from '../../key.word/dto/key.word.dto';
import { SourcesDto } from '../../sources/dto/sources.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class WorkDto {
  @ApiModelProperty()
  introduction: string;
  @ApiModelProperty()
  actuals: string;
  @ApiModelProperty()
  aimsAndTasks: string;
  @ApiModelProperty()
  overview: string;
  @ApiModelProperty()
  mainPart: string;
  @ApiModelProperty()
  programImplementation: string;
  @ApiModelProperty()
  conclusions: string;
  @ApiModelProperty()
  keyWords: KeyWordDto[];
  @ApiModelProperty()
  sources: SourcesDto[];
}
