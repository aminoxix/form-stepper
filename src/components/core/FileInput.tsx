import React, { useRef, FC, ChangeEvent, ReactNode, Ref } from "react";

interface FileInputProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

interface FileInputProps extends React.ComponentProps<"input"> {
  value?: string;
}

const FileInput: FC<FileInputProps> = ({ value, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex gap-5 items-center w-auto h-9">
      <button
        className="border px-5 border-black rounded-md"
        onClick={handleClick}
      >
        Choose File
      </button>
      <span>{value ?? "No file chosen."}</span>
      <input {...rest} type="file" ref={inputRef} className="hidden" />
    </div>
  );
};

export default FileInput;
