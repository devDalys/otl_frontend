import {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://onetimelink.ru',
      lastModified: new Date(),
    },
  ];
}
