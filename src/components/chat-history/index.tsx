import { ChatType } from 'models/openai';
import style from './chat-history.module.scss';

interface Props {
  data: ChatType[];
  className: string;
}
const ChatHistory = (props: Props) => {
  const { data, className } = props;
  return (
    <div className={`${style.messages} ${className}`}>
      {data.map((item, index) => (
        <div key={index}>
          <div className={`${style.message} ${style.ask}`}>{item.ask}</div>
          <div className={`${style.message} ${style.answer}`}>
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
