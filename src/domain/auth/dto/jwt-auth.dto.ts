import { IsNotEmpty } from 'class-validator';

export class RefreshAccessTokenResponseDTO {
  @IsNotEmpty()
  accessToken: string;
}
