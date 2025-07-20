import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import type { MouseEventHandler, PropsWithChildren } from 'react';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: MouseEventHandler;
}

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 flex items-center justify-center'
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative'>
        <div className='pb-8 flex flex-row justify-between'>
          <span className='font-bold'>{title}</span>
          <button
            className='w-8 h-8 top-2 rounded-full right-2 text-gray-500 cursor-pointer hover:text-gray-700 hover:bg-stone-200'
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className='block'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
