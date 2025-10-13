'use client';

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function ToggleSwitch({
  id,
  checked,
  onChange,
  label = '최대 혜택 적용',
}: ToggleSwitchProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center">
      <span className="mr-2 text-sm text-gray-600">{label}</span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-600 peer-focus:ring-2 peer-focus:ring-green-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
    </label>
  );
}
