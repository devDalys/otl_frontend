'use client';

import styles from './Tooltip.module.scss';
import * as TooltipRadix from '@radix-ui/react-tooltip';
import React, {useState} from 'react';

type Props = {
  children: React.ReactNode;
  text: string;
};

export const Tooltip = ({children, text}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipRadix.Provider>
      <TooltipRadix.Root delayDuration={1} open={open} onOpenChange={setOpen}>
        <TooltipRadix.Trigger
          asChild
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          onFocus={() => setTimeout(() => setOpen(true), 0)} // timeout needed to run this after onOpenChange to prevent bug on mobile
          onBlur={() => setOpen(false)}
        >
          {children}
        </TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content className={styles.Content} sideOffset={5}>
            {text}
            <TooltipRadix.Arrow className={styles.Arrow} />
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
};
