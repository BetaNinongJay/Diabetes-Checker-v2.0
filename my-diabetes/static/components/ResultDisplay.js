function ResultDisplay({ result }) {
  const { prediction, probability, message } = result;
  const confidence = (probability * 100).toFixed(1);

  return (
     <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-[var(--text-primary)] mb-4">
        Your Result
      </h2>
      <div className="text-center">
        <p className="text-lg">
          Status: <span className={`font-semibold ${prediction === 1 ? "text-red-600" : "text-green-600"}`}>
            {message}
          </span>
        </p>
        <p className="text-gray-700 mt-2">
          Confidence: <span className="font-medium">{confidence}%</span>
        </p>
      </div>
    </div>
  );
}
