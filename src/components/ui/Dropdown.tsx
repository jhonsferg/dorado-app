import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface DropdownProps {
  label: string;
}

const Dropdown = ({ label }: PropsWithChildren<DropdownProps>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='relative inline-block text-left'>
      <button
        className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer flex-row gap-2 items-center'
        onClick={toggle}
      >
        <FontAwesomeIcon icon={faChevronDown} />
        <span>{label}</span>
      </button>

      {isOpen && <div></div>}
    </div>
  );
};

export default Dropdown;
