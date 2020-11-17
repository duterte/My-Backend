import TypeSelect from './typeselect';
import TypeNumber from './typenumber';
import TypeRadio from './typeradio';
import List from './list';
import Address from './address';

function InputForm({ meta }) {
  const { type, ...rest } = meta;
  if (type === 'select') return <TypeSelect meta={rest} />;
  if (type === 'number') return <TypeNumber meta={rest} />;
  if (type === 'radio') return <TypeRadio meta={rest} />;
  if (type === 'custom-list') return <List meta={rest} />;
  if (type === 'custom-input') return <Address meta={rest} />;
  return null;
}

export default InputForm;
