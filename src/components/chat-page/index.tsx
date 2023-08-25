import Modal from 'antd/lib/modal';
import ChatForm from 'components/chat-form';
import ChatHistory from 'components/chat-history';
import { BACKUP_KEY } from 'constant';
import useApi from 'hooks/api';
import { ChatType, OpenAiType } from 'models/openai';
import React, { useEffect, useState } from 'react';
import style from './chat-page.module.scss';
const config = {
  title: 'Confirm',
  content: <>Do you want to save this answer?</>,
};
const ChatPage: React.FC = () => {
  const [chatData, setChatData] = useState<ChatType[]>();
  const { fetchData } = useApi();
  const [modal, contextHolder] = Modal.useModal();

  /**
   * get answer from chat gpt
   * @param values
   */
  const onSubmit = async (values: { question: string }) => {
    const id = new Date().valueOf().toString();
    const newData = [...(chatData ?? [])];
    const dataTemp = [...(chatData ?? [])];
    dataTemp.push({
      id,
      answer: '...',
      ask: values.question,
    });
    setChatData(dataTemp);
    fetchData<OpenAiType>({
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: values.question,
          },
        ],
        temperature: 0.7,
      },
      successCallbackFn: async (res) => {
        if (res.choices.length > 0) {
          const newItem = {
            id,
            answer: res.choices[0].message.content ?? '',
            ask: values.question,
          };
          newData.push(newItem);
          setChatData(newData);
          if (await modal.confirm(config)) handleConfirmSave(newItem);
        }
      },
    });
  };
  const handleConfirmSave = (item: ChatType) => {
    const savedData = localStorage.getItem(BACKUP_KEY);
    const newSaveData = savedData ? JSON.parse(savedData) : [];
    newSaveData.push(item);
    localStorage.setItem(BACKUP_KEY, JSON.stringify(newSaveData));
  };

  /**
   * init chat data
   */
  useEffect(() => {
    const initData = localStorage.getItem(BACKUP_KEY);
    if (initData) {
      setChatData(JSON.parse(initData));
    }
  }, []);

  return (
    <section className={style.container}>
      {chatData && chatData.length > 0 && (
        <ChatHistory className={style.messages} data={chatData} />
      )}
      <ChatForm onSubmit={onSubmit} className={style.form} />
      {contextHolder}
    </section>
  );
};

export default ChatPage;
