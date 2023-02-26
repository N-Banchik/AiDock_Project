import { PhotosService } from './photos.service';

import { Module } from '@nestjs/common';
import { PhotosProvider } from './photos/photos';

@Module({
  providers: [PhotosService, PhotosProvider],
  exports: [PhotosService, PhotosProvider],
})
export class PhotosModule {}
