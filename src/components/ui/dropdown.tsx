import React, { useEffect, useState, useRef } from 'react'
import { Button } from "./button"
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { cn } from "@/lib/utils"

interface DropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Dropdown({ 
  value, 
  options, 
  onChange, 
  disabled = false,
  className 
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const updatePosition = () => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setShowAbove(spaceBelow < 200 && rect.top > 200); // Show above if less than 200px below and enough space above
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      updatePosition();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e: React.MouseEvent, option: string) => {
    e.stopPropagation();
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        className={cn("w-[140px] justify-between", className)}
        onClick={handleDropdownClick}
        disabled={disabled}
        type="button"
      >
        <span className="truncate">{value}</span>
        <ChevronDownIcon className={cn(
          "h-4 w-4 opacity-50 transition-transform duration-200",
          isOpen && "transform rotate-180"
        )} />
      </Button>
      {isOpen && (
        <div className={cn(
          "absolute right-0 w-[140px] rounded-md dark:text-black bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50",
          showAbove ? "bottom-full mb-2" : "top-full mt-2"
        )}>
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={cn(
                  "block w-full px-4 py-2 text-sm text-left hover:bg-gray-100",
                  option === value && "bg-gray-50"
                )}
                onClick={(e) => handleOptionClick(e, option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}