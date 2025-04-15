import axios from 'axios';

const WINDOW_SIZE = 10;
const TIMEOUT = 500;

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0NzAyODQ4LCJpYXQiOjE3NDQ3MDI1NDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ0NmYzMTUyLTQ2MWMtNDRjZS1hZWRjLTBmMDFiMTc1Njg5YSIsInN1YiI6ImFiaGlzaGVrMTE3My5iZTIyQGNoaXRrYXJhLmVkdS5pbiJ9LCJlbWFpbCI6ImFiaGlzaGVrMTE3My5iZTIyQGNoaXRrYXJhLmVkdS5pbiIsIm5hbWUiOiJhYmhpc2hlayBzYWNoZGV2YSIsInJvbGxObyI6IjIyMTA5OTExNzMiLCJhY2Nlc3NDb2RlIjoiUHd6dWZHIiwiY2xpZW50SUQiOiJkNDZmMzE1Mi00NjFjLTQ0Y2UtYWVkYy0wZjAxYjE3NTY4OWEiLCJjbGllbnRTZWNyZXQiOiJuZGR2Vk5GWHV4SFB2eVJ2In0.LrsNK12enUwFJH6iiKKwiWdO-YWUzKis8npCun4Tomc";

let numberWindow = [];

const performTask = async (req, res) => {
  const numberSources = {
    p: "http://20.244.56.144/evaluation-service/primes",
    f: "http://20.244.56.144/evaluation-service/fibo",
    e: "http://20.244.56.144/evaluation-service/even",
    r: "http://20.244.56.144/evaluation-service/rand",
  };

  const { numberid } = req.params;
  const apiUrl = numberSources[numberid];

  if (!apiUrl) {
    return res.status(400).json({ error: "Invalid number ID" });
  }

  const windowPrevState = [...numberWindow];
  let fetchedNumbers = [];

  try {
    const response = await axios.get(apiUrl, {
      timeout: TIMEOUT,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    fetchedNumbers = response.data.numbers || [];
  } catch (err) {
    console.error("Error fetching numbers:", err.message);
    return res.status(500).json({ error: err.message });
  }

  for (let num of fetchedNumbers) {
    if (!numberWindow.includes(num)) {
      numberWindow.push(num);
      if (numberWindow.length > WINDOW_SIZE) {
        numberWindow.shift();
      }
    }
  }

  const avg = numberWindow.reduce((acc, val) => acc + val, 0) / numberWindow.length || 0;

  return res.json({
    windowPrevState,
    windowCurrState: [...numberWindow],
    numbers: fetchedNumbers,
    avg: parseFloat(avg.toFixed(2)),
  });
};

export default performTask;
