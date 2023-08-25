import { Button, Form, Input } from 'antd';
import style from './chat-form.module.scss';
import React from 'react';
interface ItemsType {
  question: string;
}
interface Props {
  onSubmit: (values: { question: string }) => void;
  className: string;
}

const ChatForm = (props: Props) => {
  const { onSubmit, className } = props;
  const [form] = Form.useForm();

  const handleSubmit = (values: ItemsType) => {
    form.resetFields();
    onSubmit(values);
  };
  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={(values) => {
        handleSubmit(values);
      }}
    >
      <div className={`${className ?? ''} ${style.chat__form}`}>
        <Form.Item
          className={style.question}
          name="question"
          rules={[{ required: true }]}
        >
          <Input placeholder="Typing your question?" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          SEND
        </Button>
      </div>
    </Form>
  );
};

export default ChatForm;
