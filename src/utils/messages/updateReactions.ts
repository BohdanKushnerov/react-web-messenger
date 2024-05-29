const updateReactions = (
  emojiKey: string,
  existingIds: string[],
  currentUserUID: string,
  reactions: Record<string, string[]>
): Record<string, string[]> => {
  const currentUserReactionIndex = existingIds.indexOf(currentUserUID);
  const updatedReactions = { ...reactions };

  if (currentUserReactionIndex !== -1) {
    if (existingIds.length === 1) {
      delete updatedReactions[emojiKey];
    } else {
      updatedReactions[emojiKey] = existingIds.filter(
        (id: string) => id !== currentUserUID
      );
    }
  } else {
    updatedReactions[emojiKey] = [...existingIds, currentUserUID];
  }

  return updatedReactions;
};

export default updateReactions;
