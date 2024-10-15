export const emitYmEvent = (
  event: string,
  params: Record<string, any> = {},
) => {
  if (!window?.ym) {
    return;
  }

  const currentDate = new Date();

  window.ym(98600395, 'reachGoal', event, {
    event_timestamp: `${currentDate.toLocaleString('RU')}`,
    ...params,
  });
};
