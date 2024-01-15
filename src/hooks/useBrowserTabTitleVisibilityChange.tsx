import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import changeFaviconBrowserTab from '@utils/changeFaviconBrowserTab';
import { IUseBrowserTabTitleVisibilityChange } from '@interfaces/hooks/IUseBrowserTabTitleVisibilityChange';
import faviconTab from '@assets/faviconTab.ico';
import faviconMessageTab from '@assets/faviconMessageTab.ico';

const useBrowserTabTitleVisibilityChange: IUseBrowserTabTitleVisibilityChange =
  countChatUnreadMessages => {
    const [docHidden, setDocHidden] = useState(false);

    const changeTitleIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const { t } = useTranslation('translation', {
      keyPrefix: 'ChatListUnreadMsg',
    });

    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          setDocHidden(true);
        } else {
          setDocHidden(false);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
      };
    }, []);

    useEffect(() => {
      const startChangeChatTitle = () => {
        const chatOriginalTitle = 'React Web Messenger';

        if (docHidden) {
          // Вкладка стала неактивной
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
          // Вкладка стала активной

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
      };
    }, [countChatUnreadMessages, docHidden, t]);
  };

export default useBrowserTabTitleVisibilityChange;
