import { ApiProperty } from '@nestjs/swagger';

export class NewsletterUnsubscribeResponse {
  @ApiProperty({ type: 'string', default: '' })
  reason: string;
}
