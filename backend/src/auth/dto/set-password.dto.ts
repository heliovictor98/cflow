export class SetPasswordDto {
  /** Token recebido no login quando requiresPasswordSetup é true */
  token!: string;
  newPassword!: string;
}
