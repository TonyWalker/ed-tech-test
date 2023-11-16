import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { Readable } from 'stream';
import { join } from 'path';

@Injectable()
export class StreamsService {
  async getVideoStream(id: string): Promise<Readable> {
    //mock video for showcase
    id = join(__dirname, 'data/uLesson.mp4');

    if (!fs.existsSync(id)) {
      throw new NotFoundException('Video not found');
    }

    return fs.createReadStream(id);
  }
}
