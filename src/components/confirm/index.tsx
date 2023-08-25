import { Modal } from 'antd';

interface Props {
  isOpen: boolean;
  description: string;
  title: string;
  handleModal: (status: boolean) => void;
  onClickOK: () => void;
}

const Confirm = (props: Props) => {
  const { isOpen, handleModal, description, title, onClickOK } = props;
  /**
   * implement the action after agree
   */
  const handleOk = () => {
    onClickOK();
    handleModal(false);
  };
  /**
   * hide modal
   */
  const handleCancel = () => {
    handleModal(false);
  };

  return (
    <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>{description}</p>
    </Modal>
  );
};

export default Confirm;
