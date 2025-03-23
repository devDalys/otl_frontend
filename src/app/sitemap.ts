import {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://onetimelink.ru',
      lastModified: new Date(),
    },
    {
      url: 'https://onetimelink.ru/en',
      lastModified: new Date(),
    },
    {
      url: 'https://onetimelink.ru/en/help',
      lastModified: new Date(),
    },
    {
      url: 'https://onetimelink.ru/help',
      lastModified: new Date(),
    },
  ];
}
