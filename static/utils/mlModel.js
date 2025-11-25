async function predictDiabetes(inputData) {
  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData)
    });

    if (!response.ok) throw new Error("API request failed");

    return await response.json();
  } catch (err) {
    console.error("ML prediction error:", err);
    return { error: true, message: "Failed to get prediction." };
  }
}
