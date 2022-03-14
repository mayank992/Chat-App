import userIcon from "../../assets/user.png";
import { MessageType } from "../../types";
import { formatDate } from "../../utils/dateFormatter";

type MessagePropsType = {
  message: MessageType;
};

export function Message({ message }: MessagePropsType) {
  return (
    <div className="message">
      <img src={userIcon} className="message__user-img" alt="user-img" />
      <div className="message__body">
        <header className="message__header">
          <h4 className="message__username">{message.from.name}</h4>
          <p className="message__time">{formatDate(message.time)}</p>
        </header>
        <p className="message__text">{message.message}</p>
      </div>
    </div>
  );
}
