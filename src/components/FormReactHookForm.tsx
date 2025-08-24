import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { configComponent } from '../form-config/configComponent';
import { formSchema } from '../form-config/validation-zod';
import { useFormStore } from '../hooks/useStore';
import type { DataForm } from '../form-config/types';
import type { CloseProps } from './OverlayModal';
import { useEffect } from 'react';
import { initialCountries } from '../hooks/country-list';
import './style.css';

const FormReactHookForm = ({ onClose }: CloseProps) => {
  const { addFormData, countries, setCountries } = useFormStore();
  useEffect(() => {
    if (countries.length === 0) {
      setCountries(initialCountries);
    }
  }, [countries.length, setCountries]);

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
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {configComponent.map((field) => (
        <div key={field.name}>
          {field.type !== 'checkbox' && field.name !== 'country' && (
            <label htmlFor={field.name}>{field.placeholder}</label>
          )}

          {field.name === 'country' ? (
            <>
              <label htmlFor="country-input">{field.placeholder}</label>
              <input
                id="country-input"
                type="text"
                list="countries-list"
                {...register('country')}
                autoComplete="off"
                placeholder="Start typing country..."
              />
              <datalist id="countries-list">
                {countries.map((country) => (
                  <option key={country} value={country} />
                ))}
              </datalist>
            </>
          ) : field.type === 'select' ? (
            <select id={field.name} {...register(field.name)}>
              <option value="">Select {field.placeholder}</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : field.type === 'checkbox' ? (
            <label htmlFor={field.name}>
              <input
                id={field.name}
                type="checkbox"
                {...register(field.name)}
              />
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
              placeholder={field.placeholder}
            />
          )}

          {errors[field.name]?.message && (
            <p className="error-message">
              {String(errors[field.name]?.message)}
            </p>
          )}
        </div>
      ))}

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default FormReactHookForm;
