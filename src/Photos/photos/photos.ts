import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigOptions, v2 } from 'cloudinary';
import { CLOUDINARY } from '../constants';

export const PhotosProvider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService): ConfigOptions => {
    return v2.config({
      cloud_name: configService.get<string>('CLOUDINARY_NAME'),
      api_key: configService.get<string>('CLOUDINARY_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_SECRET'),
      secure: true,
    });
  },

  inject: [ConfigService],
};
