import './style.css';

export interface CloseProps {
  onClose: () => void;
}

const OverlayModal = ({ onClose }: CloseProps) => {
  return <div className="overlay" onClick={onClose}></div>;
};

export default OverlayModal;
