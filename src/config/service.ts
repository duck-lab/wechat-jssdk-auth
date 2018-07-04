import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export class ConfigService {
  private readonly envConfig: { [prop: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(
      fs.readFileSync(path.join(process.cwd(), filePath)),
    );
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
