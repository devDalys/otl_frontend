import 'server-only';

type FileKeys = 'main';

const dictionaries = {
  en: (file: FileKeys) =>
    import(`../../localization/en/${file}.json`).then(
      (module) => module.default,
    ),
  ru: (file: FileKeys) =>
    import(`../../localization/ru/${file}.json`).then(
      (module) => module.default,
    ),
};

export const getDictionary = async (locale: 'en' | 'ru', file: FileKeys) =>
  dictionaries[locale](file);
