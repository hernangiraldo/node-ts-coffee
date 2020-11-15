import bcrypt from 'bcrypt';

export class EncryptDecryptPassword {
  private readonly pass: string;

  constructor(pass: string) {
    this.pass = pass;
  }

  public encryptPass(): any {
    return bcrypt.hashSync(this.pass, 10);
  }

  public decryptPass() {
    // return bcrypt.compareSync
  }
}