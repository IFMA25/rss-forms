import { useRef, useState, useEffect } from 'react';
import { useFormStore } from '../hooks/useStore';
import { initialCountries } from '../hooks/country-list';
import type { CloseProps } from './OverlayModal';
import type { DataForm } from '../form-config/types';
import { configComponent } from '../form-config/configComponent';
import { formSchema } from '../form-config/validation-zod';
import './style.css';

const FormUncontrolled = ({ onClose }: CloseProps) => {
  const { addFormData, countries, setCountries } = useFormStore();
  const formRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countryValue, setCountryValue] = useState('');

  useEffect(() => {
    if (countries.length === 0) {
      setCountries(initialCountries);
    }
  }, [countries.length, setCountries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formElements = formRef.current.elements;
    const dataObj: Partial<DataForm> = { country: countryValue };

    configComponent.forEach((field) => {
      if (field.name === 'country') return;

      const element = formElements.namedItem(field.name);
      if (!element) return;

      if (element instanceof HTMLInputElement) {
        if (field.type === 'checkbox') {
          dataObj[field.name as keyof DataForm] = element.checked;
        } else if (field.type === 'file') {
          dataObj.picture = element.files ?? null;
        } else if (field.type === 'number') {
          dataObj[field.name as keyof DataForm] = element.value
            ? Number(element.value)
            : 0;
        } else {
          dataObj[field.name as keyof DataForm] = element.value;
        }
      }

      if (element instanceof HTMLSelectElement) {
        dataObj[field.name as keyof DataForm] = element.value;
      }
    });

    const result = formSchema.safeParse(dataObj);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const fieldName = String(err.path[0]);
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
          setCountryValue('');
          onClose();
        }
      };
      reader.readAsDataURL(file);
    } else {
      addFormData(validData as DataForm);
      formRef.current?.reset();
      setCountryValue('');
      onClose();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {configComponent.map((field) => (
        <div key={field.name} className="form-field">
          {field.name === 'country' ? (
            <>
              <label htmlFor="country">Country</label>
              <input
                id="country"
                name="country"
                type="text"
                list="countries-list"
                value={countryValue}
                onChange={(e) => setCountryValue(e.target.value)}
                placeholder="Start typing country..."
              />
              <datalist id="countries-list">
                {countries.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </>
          ) : field.type === 'checkbox' ? (
            <label htmlFor={field.name}>
              <input id={field.name} name={field.name} type="checkbox" />
              {field.placeholder}
            </label>
          ) : field.type === 'file' ? (
            <>
              <label htmlFor={field.name}>{field.placeholder}</label>
              <input
                id={field.name}
                name={field.name}
                type="file"
                accept="image/png, image/jpeg"
              />
            </>
          ) : field.type === 'select' ? (
            <>
              <label htmlFor={field.name}>{field.placeholder}</label>
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
            </>
          ) : (
            <>
              <label htmlFor={field.name}>{field.placeholder}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
              />
            </>
          )}

          {errors[field.name] && (
            <p className="error-message">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default FormUncontrolled;
