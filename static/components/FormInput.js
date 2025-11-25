function FormInput({ label, name, value, onChange }) {

   const floatFields = ["BMI", "DiabetesPedigreeFunction", "Glucose", "BloodPressure", "SkinThickness", "Insulin"];
  
  const handleChange = (e) => {
    let val = e.target.value;
    // Allow empty string to delete zero
    if (val === "") {
      onChange({ target: { name, value: "" } });
      return;
    }

    // Convert to float if field allows it, otherwise integer
    if (floatFields.includes(name)) {
      onChange({ target: { name, value: parseFloat(val) } });
    } else {
      onChange({ target: { name, value: parseInt(val) } });
    }
  };

  return (
    <div>
      <label className="form-label" htmlFor={name}>{label}</label>
      <input
        className="form-input"
        id={name}
        name={name}
        type="number"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
