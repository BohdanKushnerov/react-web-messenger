import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import changeFaviconBrowserTab from '@utils/changeFaviconBrowserTab';
import { IUseBrowserTabTitleChange } from '@interfaces/hooks/IUseBrowserTabTitleChange';
import faviconTab from '@assets/faviconTab.ico';
import faviconMessageTab from '@assets/faviconMessageTab.ico';

const useBrowserTabTitleChange: IUseBrowserTabTitleChange = (
  countChatUnreadMessages,
  docHidden
) => {
  const changeTitleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation('translation', {
    keyPrefix: 'ChatListUnreadMsg',
  });

  useEffect(() => {
    const chatOriginalTitle = 'React Web Messenger';

    const startChangeChatTitle = () => {
      if (docHidden) {
        if (countChatUnreadMessages) {
          const changeTitleInterval = () => {
            if (document.title === chatOriginalTitle) {
              document.title =
                countChatUnreadMessages === 1
                  ? `(${countChatUnreadMessages}) ${t('UnreadMessage')}`
                  : `(${countChatUnreadMessages}) ${t('UnreadMessages')}`;

              changeFaviconBrowserTab(faviconMessageTab);
            } else {
              document.title = chatOriginalTitle;

              changeFaviconBrowserTab(faviconTab);
            }
          };

          if (changeTitleIntervalRef.current) {
            clearInterval(changeTitleIntervalRef.current);
            changeTitleIntervalRef.current = null;
          }

          changeTitleIntervalRef.current = setInterval(
            changeTitleInterval,
            2000
          );
        }
      } else {
        changeFaviconBrowserTab(faviconTab);

        if (changeTitleIntervalRef.current) {
          clearInterval(changeTitleIntervalRef.current);
          changeTitleIntervalRef.current = null;
        }

        document.title = chatOriginalTitle;
      }

      return;
    };

    startChangeChatTitle();

    return () => {
      if (changeTitleIntervalRef.current) {
        clearInterval(changeTitleIntervalRef.current);
        changeTitleIntervalRef.current = null;
      }

      changeFaviconBrowserTab(faviconTab);

      document.title = chatOriginalTitle;
    };
  }, [countChatUnreadMessages, docHidden, t]);
};

export default useBrowserTabTitleChange;
