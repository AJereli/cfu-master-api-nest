import { Column } from 'typeorm';
import { KeyWordDto } from '../../key.word/dto/key.word.dto';
import { SourcesDto } from '../../sources/dto/sources.dto';

export class WorkDto {
  introduction: string;

  actuals: string;

  aimsAndTasks: string;

  overview: string;

  mainPart: string;

  programImplementation: string;

  conclusions: string;

  keyWords: KeyWordDto[];

  sources: SourcesDto[];
}
