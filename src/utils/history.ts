const HISTORY = 'LOCAL_HISTORY';

export type HistoryLink = {
  type: 'opening' | 'creating';
  timestamp: number;
  link: string;
};

const add = (item: HistoryLink) => {
  try {
    const existItems = localStorage.getItem(HISTORY);

    if (existItems) {
      const items: Array<HistoryLink> = JSON.parse(existItems);
      items.push(item);
      localStorage.setItem(HISTORY, JSON.stringify(items));
    } else {
      localStorage.setItem(HISTORY, JSON.stringify([item]));
    }
  } catch (e) {
    return localStorage.setItem(HISTORY, JSON.stringify([item]));
  }
};

const get = () => {
  const items = localStorage.getItem(HISTORY);
  if (!items) return [];
  try {
    return JSON.parse(items);
  } catch (e) {
    return [];
  }
};

const deleteAll = () => {
  localStorage.removeItem(HISTORY);
};

export const historyActions = {
  add,
  get,
  deleteAll,
};
