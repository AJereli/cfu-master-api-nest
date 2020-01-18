import { ApiProperty } from '@nestjs/swagger';

export class StatisticDto {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  totalWorkNumber: number;
  @ApiProperty()
  totalUsedSource: number;
}
