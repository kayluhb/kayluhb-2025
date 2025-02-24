import { memo } from 'react';

type InputProps = {
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
};
export const Input: React.FC<InputProps> = memo(({ disabled, onChange, onKeyDown, onFocus, onBlur, value }) => (
  <input
    aria-description="The text you enter will be displayed as animated particles"
    aria-label="Enter text for particle animation"
    className="w-[80%] max-w-[300px] rounded-sm border border-gray-300 px-4 py-2 text-center text-lg md:w-auto md:text-base"
    disabled={disabled}
    maxLength={20}
    onBlur={onBlur}
    onChange={onChange}
    onFocus={onFocus}
    onKeyDown={onKeyDown}
    role="textbox"
    type="text"
    value={value}
  />
));
