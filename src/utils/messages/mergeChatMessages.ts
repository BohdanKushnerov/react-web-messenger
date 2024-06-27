import type { GroupedMessages } from 'types/GroupedMessages';

const mergeChatMessages = (obj1: GroupedMessages, obj2: GroupedMessages) => {
  const merged = { ...obj1 };

  for (const key in obj2) {
    if (merged[key]) {
      merged[key] = [...merged[key], ...obj2[key]];
    } else {
      merged[key] = obj2[key];
    }
  }

  return merged;
};

export default mergeChatMessages;
