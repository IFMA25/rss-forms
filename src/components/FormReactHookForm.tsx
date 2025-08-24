import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { configComponent } from '../form-config/configComponent';
import { formSchema } from '../form-config/validation-zod';
import { useFormStore } from '../hooks/useStore';
import type { DataForm } from '../form-config/types';
import type { CloseProps } from './OverlayModal';

const FormReactHookForm = ({ onClose }: CloseProps) => {
  const { addFormData } = useFormStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: DataForm) => {
    const file = data.picture[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      addFormData({ ...data, picture: reader.result as string });
      reset();
      onClose();
      console.log('Form data saved to store:', {
        ...data,
        picture: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {configComponent.map((field) => (
        <div key={field.name}>
          {field.type !== 'checkbox' && field.type !== 'file' && (
            <label htmlFor={field.name}>{field.placeholder}</label>
          )}

          {field.type === 'select' ? (
            <select id={field.name} {...register(field.name)}>
              <option value="">Select {field.placeholder}</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : field.type === 'checkbox' ? (
            <label>
              <input type="checkbox" {...register(field.name)} />
              {field.placeholder}
            </label>
          ) : field.type === 'file' ? (
            <input
              id={field.name}
              type="file"
              {...register(field.name)}
              accept="image/png, image/jpeg"
            />
          ) : (
            <input
              id={field.name}
              type={field.type}
              {...register(field.name)}
            />
          )}

          {errors[field.name]?.message && (
            <p className="error-message">
              {String(errors[field.name]?.message)}
            </p>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormReactHookForm;
