import userIcon from "../../assets/user.png";
import { MessageType } from "../../types";

export function Message({ message }: { message: MessageType }) {
  return (
    <div className="message">
      <img src={userIcon} className="message__user-img" alt="user-img" />
      <div className="message__body">
        <header className="message__header">
          <h4 className="message__username">{message.from}</h4>
          <p className="message__time">{message.time}</p>
        </header>
        <p className="message__text">{message.text}</p>
      </div>
    </div>
  );
}
