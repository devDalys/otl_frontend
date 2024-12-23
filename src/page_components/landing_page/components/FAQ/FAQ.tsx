import styles from './FAQ.module.scss';
import {faqData} from '@/page_components/landing_page/components/FAQ/faqData';
import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';

export const FAQ = () => {
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
              name: question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: answer,
              },
            })),
          }),
        }}
      />
      <h3 className={styles.title}>Вопросы и ответы</h3>
      <Accordion.Root type="multiple" className={styles.accordion}>
        {faqData.map((item, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className={styles.accordion__item}
          >
            <Accordion.Header>
              <Accordion.Trigger className={styles.accordion__item_title}>
                {item.question}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={styles.accordion__item_answer}>
              <p>{item.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};
