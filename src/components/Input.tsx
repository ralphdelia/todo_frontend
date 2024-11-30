interface InputProps {
  errors: string[] | undefined;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "date" | "text";
}

const Input = (props: InputProps) => {
  const { errors, ...properties } = props;
  return (
    <div>
      {errors === undefined ? (
        <input {...properties} />
      ) : (
        <input
          {...properties}
          aria-invalid={errors !== undefined && errors.length > 0}
        />
      )}

      {errors &&
        errors.map((error, index) => (
          <small key={index} id="valid-helper">
            {error}
          </small>
        ))}
    </div>
  );
};
export default Input;
