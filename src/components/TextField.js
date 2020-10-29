import { Field, ErrorMessage } from "formik";
const TextField = ({ label, name, type, disabled }) => {
  return (
    <div className="detailItem">
      <label htmlFor={name}>{label.toLowerCase()}</label>
      <Field name={name} type={type} disabled={disabled} />
      <div>
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default TextField;
