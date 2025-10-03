export interface HistoryItem {
  id: string;
  imageData: string; // base64 string
  prompt: string;
  aspectRatio: string;
  createdAt: number;
}

const HISTORY_KEY = 'ai-image-generator-history';
const MAX_HISTORY_ITEMS = 20;

export const getHistory = (): HistoryItem[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    if (!historyJson) {
      return [];
    }
    const history = JSON.parse(historyJson) as HistoryItem[];
    // Sort by most recent first
    return history.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Failed to retrieve history from local storage:', error);
    return [];
  }
};

export const saveToHistory = (item: Omit<HistoryItem, 'id' | 'createdAt'>): void => {
  try {
    const history = getHistory();
    const newItem: HistoryItem = {
      ...item,
      id: new Date().toISOString() + Math.random(),
      createdAt: Date.now(),
    };

    // Add new item to the beginning and slice to maintain max length
    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to save to history in local storage:', error);
  }
};
