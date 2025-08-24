import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import './style.css';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main>
      <div className="container">
        <div className="section">
          <h2>Form Section 1</h2>
          <Button onClick={openModal}>Submit</Button>
          {isModalOpen && <Modal onClose={closeModal}>Modal Content</Modal>}
        </div>
        <div className="section">
          <h2>Form Section 2</h2>
          <Button onClick={openModal}>Submit</Button>
        </div>
      </div>
      {isModalOpen && <Modal onClose={closeModal}>Modal Content</Modal>}
    </main>
  );
};

export default Main;
