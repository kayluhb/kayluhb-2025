import { memo } from 'react';

type InputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
};
export const Input: React.FC<InputProps> = memo(({ onChange, onKeyDown, onFocus, onBlur, value }) => (
  <input
    aria-description="The text you enter will be displayed as animated particles"
    aria-label="Enter text for particle animation"
    className="fixed bottom-24 left-1/2 z-10 w-[80%] max-w-[300px] -translate-x-1/2 rounded-sm border border-gray-300 px-4 py-2 text-center text-lg md:bottom-6 md:w-auto md:text-base"
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
