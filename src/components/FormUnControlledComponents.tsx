import { useRef, useState } from 'react';
import { useFormStore } from '../hooks/useStore';
import type { CloseProps } from './OverlayModal';
import type { DataForm } from '../form-config/types';
import { configComponent } from '../form-config/configComponent';
import { formSchema } from '../form-config/validation-zod';

const FormUncontrolled = ({ onClose }: CloseProps) => {
  const { addFormData } = useFormStore();
  const formRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formElements = formRef.current.elements;
    const dataObj: Partial<DataForm> = {};

    configComponent.forEach((field) => {
      const element = formElements.namedItem(field.name);
      if (!element) return;

      if (
        element instanceof HTMLInputElement &&
        field.type !== 'file' &&
        field.type !== 'checkbox'
      ) {
        dataObj[field.name as keyof DataForm] = element.value;
      }

      if (element instanceof HTMLInputElement && field.type === 'checkbox') {
        dataObj[field.name as keyof DataForm] = element.checked;
      }

      if (element instanceof HTMLSelectElement) {
        dataObj[field.name as keyof DataForm] = element.value;
      }

      if (element instanceof HTMLInputElement && field.type === 'number') {
        const val = element.value;
        dataObj[field.name as keyof DataForm] = val ? Number(val) : 0;
      }

      if (field.type === 'file' && element instanceof HTMLInputElement) {
        dataObj.picture = element.files ?? null;
      }
    });

    const result = formSchema.safeParse(dataObj);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as string;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const validData = result.data;

    if (validData.picture && validData.picture.length > 0) {
      const file = validData.picture[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          addFormData({ ...validData, picture: reader.result });
          formRef.current?.reset();
          onClose();
        }
      };
      reader.readAsDataURL(file);
    } else {
      addFormData(validData as DataForm);
      formRef.current?.reset();
      onClose();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {configComponent.map((field) => (
        <div key={field.name}>
          {field.type !== 'checkbox' && (
            <label htmlFor={field.name}>{field.placeholder}</label>
          )}
          {field.type === 'select' ? (
            <select id={field.name} name={field.name} defaultValue="">
              <option value="" disabled>
                Select {field.placeholder}
              </option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              {...(field.autocomplete ? { autoComplete: 'on' } : {})}
            />
          )}
          {field.type === 'checkbox' && (
            <label htmlFor={field.name}>{field.placeholder}</label>
          )}
          {errors[field.name] && (
            <p className="error-message">{errors[field.name]}</p>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormUncontrolled;
