import { useFormStore } from '../hooks/useStore';
import CardData from './CardData';

const Main = () => {
  const formData = useFormStore((state) => state.allFormData);
  return (
    <main>
      <h2>Cards with data info</h2>
      <ul>
        {formData &&
          formData.map((data, id) => <CardData key={id} data={data} />)}
      </ul>
    </main>
  );
};

export default Main;
