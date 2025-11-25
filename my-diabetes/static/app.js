function App() {
  const [formData, setFormData] = React.useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: ""
  });
  const [result, setResult] = React.useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: Number(e.target.value)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {};
    for (let key in formData) {
      payload[key] = formData[key] === "" ? 0 : formData[key];
    }

    const res = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white mt-10 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Diabetes Risk Checker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <FormInput
            key={key}
            label={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        ))}
        <button type="submit" className="btn-primary">Check Risk</button>
      </form>
      {result && <ResultDisplay result={result} />}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
