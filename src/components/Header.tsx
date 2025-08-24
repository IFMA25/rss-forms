import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import './style.css';
import FormReactHookForm from './FormReactHookForm';
import FormUncontrolled from './FormUnControlledComponents';

const Header = () => {
  const [isModalRHFormOpen, setIsModalRHFormOpen] = useState(false);
  const [isModalUncontrolledOpen, setIsModalUncontrolledOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <div className="section">
          <h2>Open form with React hook form</h2>
          <Button onClick={() => setIsModalRHFormOpen(true)}>Submit</Button>
          {isModalRHFormOpen && (
            <Modal onClose={() => setIsModalRHFormOpen(false)}>
              <FormReactHookForm onClose={() => setIsModalRHFormOpen(false)} />
            </Modal>
          )}
        </div>
        <div className="section">
          <h2>Open form with uncontrolled form</h2>
          <Button onClick={() => setIsModalUncontrolledOpen(true)}>
            Submit
          </Button>
          {isModalUncontrolledOpen && (
            <Modal onClose={() => setIsModalUncontrolledOpen(false)}>
              <FormUncontrolled
                onClose={() => setIsModalUncontrolledOpen(false)}
              />
            </Modal>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
