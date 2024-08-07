import { forwardRef, useCallback } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { cn } from '@/utils/style';

interface Props extends DropzoneOptions {
  value?: File[];
  onChange?: (value?: File[]) => void;
}

const FileInput = forwardRef<HTMLDivElement, Props>(
  ({ value, onChange, ...rest }, ref) => {
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        onChange?.(acceptedFiles);
      },
      [onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      ...rest,
    });

    return (
      <div
        {...getRootProps({ ref })}
        className={cn(
          'h-40 flex justify-center items-center rounded-xl border-dashed border-2 border-sky-500/50 transition-colors',
          isDragActive && 'border-sky-500'
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </div>
    );
  }
);
FileInput.displayName = 'FileInput';

export default FileInput;
