import { createPortal } from 'react-dom';
import './style.css';
import OverlayModal from './OverlayModal';
import { useEffect } from 'react';

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const modal = document.getElementById('modal');
if (!modal) {
  throw new Error('Modal element not found');
}
const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);
  return createPortal(
    <>
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
      <OverlayModal onClose={onClose} />
    </>,
    modal
  );
};

export default Modal;
