import type { DataForm } from '../form-config/types';

interface CardDataProps {
  data: DataForm;
}

const CardData = ({ data }: CardDataProps) => {
  return (
    <li>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
      <p>Email: {data.email}</p>
      <p>Password: {data.password1}</p>
      <p>Gender: {data.gender}</p>
      <p>Country: {data.country}</p>
      {data.picture && (
        <img
          src={data.picture}
          alt="Uploaded"
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        />
      )}
    </li>
  );
};

export default CardData;
