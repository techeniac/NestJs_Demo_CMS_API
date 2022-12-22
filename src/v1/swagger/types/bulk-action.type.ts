import { ApiProperty } from '@nestjs/swagger';

export class BulkActionBody {
  @ApiProperty({
    type: 'string',
    isArray: true,
    default: ['637de00a46dcd4def919b8e5', '637de01246dcd4def919b8e7'],
  })
  ids: string[];
}
