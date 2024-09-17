import { forwardRef, useCallback } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { cn } from '@/utils/style';

interface Props extends DropzoneOptions {
  placeholder?: string;
  className?: string;
  onChange?: (files?: File[]) => void;
}

const FileInput = forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      placeholder = `Drag 'n' drop some files here, or click to select files`,
      onChange,
      ...rest
    },
    ref
  ) => {
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
          onChange?.(acceptedFiles);
        }
      },
      [onChange]
    );

    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      onDrop,
      ...rest,
    });

    return (
      <div
        {...getRootProps({ ref })}
        className={cn(
          'h-40 flex justify-center items-center rounded-xl outline-dashed outline-2 outline-offset-2 outline-sky-500/50 transition-colors',
          isFocused && 'outline-sky-500',
          isDragAccept && 'outline-green-500',
          isDragReject && 'outline-red-500',
          className
        )}
      >
        <input data-testid="file-input" {...getInputProps()} />
        {isDragAccept ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="text-center">{placeholder}</p>
        )}
      </div>
    );
  }
);
FileInput.displayName = 'FileInput';

export default FileInput;
