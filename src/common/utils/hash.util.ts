import * as bcrypt from 'bcrypt';

export class HashUtil  {

async encrypt(value: string, saltOrRounds: string | number): Promise<string> {
 return await bcrypt.hash(value, saltOrRounds);
}

 async compereHashedValues(value: string, hashedValue: string): Promise<boolean> {
 return await bcrypt.compare(value, hashedValue);
} 

async encryptWithRandomSalt(value: string): Promise<string> {
    const salt = await this.getSalt();

    return await this.encrypt(value, salt);
  }


  async getSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }


}