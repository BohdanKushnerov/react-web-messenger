import { FC, useCallback, useState } from "react";
import urlParser from "js-video-url-parser";

import MessageImagesWithLightBox from "../MessageImagesWithLightBox/MessageImagesWithLightBox";
import ReactionsDisplay from "../MessageReactions/ReactionsDisplay";
import IsEdited from "../IsEdited/IsEdited";
import LinkMessage from "../LinkMessage/LinkMessage";
import MessageFiles from "../MessageFiles/MessageFiles";
import MessageTriangle from "@components/Messages/MessageTriangle/MessageTriangle";
import IsReadMsg from "@components/Messages/IsReadMsg/IsReadMsg";
import useChatStore from "@zustand/store";
import useMakeReadMsg from "@hooks/useMakeReadMsg";
import formatTimeMsg from "@utils/messages/formatTimeMsg";
import isLinkMsg from "@utils/isLinkMsg";
import { IMessageItemProps } from "@interfaces/IMessageItemProps";

const MessageItem: FC<IMessageItemProps> = ({
  msg,
  isNearBottom,
  isSelectedMessages,
}) => {
  const [indexClickedPhoto, setIndexClickedPhoto] = useState(-1);

  const currentUserUID = useChatStore((state) => state.currentUser.uid);

  useMakeReadMsg(msg, isNearBottom);

  const handleClickPhoto = useCallback(
    (index: number) => {
      if (!isSelectedMessages) {
        setIndexClickedPhoto(index);
      }
    },
    [isSelectedMessages]
  );

  const myUID = currentUserUID === msg.data().senderUserID;

  const textContentMsg: string = msg.data().message;

  const info = urlParser.parse(textContentMsg);

  const isLink = isLinkMsg(textContentMsg);

  return (
    <div
      className={`relative flex w-full items-end xl:w-8/12 ${
        myUID ? "justify-end" : "justify-start"
      } ${isSelectedMessages && "pointer-events-none"}`}
      id="message"
    >
      <div
        className={`flex flex-col items-center px-4 py-2 ${
          isLink && info?.mediaType === "video" && "w-full"
        } rounded-xl ${
          msg.data().file?.length === 1 ? "max-w-md" : "max-w-xl"
        } ${
          myUID
            ? "rounded-br-none bg-mediumEmerald dark:bg-mediumDarkCyan"
            : "rounded-bl-none bg-veryLightZinc dark:bg-darkGreen"
        } shadow-secondaryShadow`}
      >
        <MessageImagesWithLightBox
          msg={msg}
          indexClickedPhoto={indexClickedPhoto}
          handleClickPhoto={handleClickPhoto}
        />

        <MessageFiles msg={msg} />

        {isLink ? (
          <>
            <LinkMessage
              textContentMsg={textContentMsg}
              isVideo={info?.mediaType === "video"}
            />
          </>
        ) : (
          <p className="w-full break-all text-black dark:text-white">
            {msg.data().message}
          </p>
        )}

        <div className="flex w-full items-baseline justify-between gap-2">
          <ReactionsDisplay reactions={msg.data().reactions} />

          <IsEdited isEdited={msg.data().isEdited} />

          <div className="flex items-center gap-2">
            <p className="text-nearBlackGreen dark:text-veryLightZinc">
              {msg.data().date &&
                formatTimeMsg(msg.data().date.toDate().toString())}
            </p>

            <IsReadMsg msg={msg} />
          </div>
        </div>
      </div>
      <MessageTriangle myUID={myUID} />
    </div>
  );
};

export default MessageItem;
