import styles from './FAQ.module.scss';
import {faqData} from '@/page_components/landing_page/components/FAQ/faqData';
import * as Accordion from '@radix-ui/react-accordion';
import {useTranslations} from 'next-intl';
import React from 'react';

export const FAQ = () => {
  const t = useTranslations('faq');

  return (
    <div>
      {/* Schema.org JSON-LD для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map(({question, answer}) => ({
              '@type': 'Question',
              name: t(question as any),
              acceptedAnswer: {
                '@type': 'Answer',
                text: t(answer as any),
              },
            })),
          }),
        }}
      />
      <h3 className={styles.title}>{t('вопросы_и_ответы')}</h3>
      <Accordion.Root type="multiple" className={styles.accordion}>
        {faqData.map((item, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className={styles.accordion__item}
          >
            <Accordion.Header>
              <Accordion.Trigger className={styles.accordion__item_title}>
                {t(item.question as any)}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={styles.accordion__item_answer}>
              <p>{t(item.answer as any)}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};
