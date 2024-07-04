import './styles.css';
import submitForm, {SUBMIT_URL} from './submitForm';
import { useId } from "react";

export const ContactForm = () => {
  const formId = useId()

  const getFieldId = (value) => `${formId}-field-${value}`
  return (
    <form
      method="POST"
      action={SUBMIT_URL}
      onSubmit={submitForm}>
      <div>
        <label htmlFor={getFieldId('name')} >Name:</label>
        <input
            type="text"
            name="name"
            aria-labelledby={getFieldId('name')}
            required
        />
      </div>
      <div>
        <label htmlFor={getFieldId('email')} >Email:</label>
        <input
          type="text"
          name="email"
          aria-labelledby={getFieldId('email')}
          required
        />
      </div>
      <div>
        <label htmlFor={getFieldId('message')} >Message:</label>
        <textarea
          name="message"
          aria-labelledby={getFieldId('message')}
          required
        />
      </div>

      <div>
        <button>Send</button>
      </div>
    </form>
  );
}
