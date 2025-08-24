import './style.css';

interface OverlayModalProps {
  onClose: () => void;
}

const OverlayModal = ({ onClose }: OverlayModalProps) => {
  return <div className="overlay" onClick={onClose}></div>;
};

export default OverlayModal;
