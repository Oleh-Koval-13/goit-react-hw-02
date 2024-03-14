import { useState, useEffect } from 'react';
import Description from '../Description/Description';
import Feedback from '../Feedback/Feedback';
import Options from '../Options/Options';
import Notification from '../Notification/Notification';

function App() {
  const [values, setValues] = useState(() => {
    const savedValues = window.localStorage.getItem('saved-feedback');

    if (savedValues !== null) {
      return JSON.parse(savedValues);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0
    }
  });

  useEffect(() => {
    window.localStorage.setItem('saved-feedback', JSON.stringify(values));
  }, [values]);
  
 const updateFeedback = feedbackType => {
  setValues({
      ...values,
      [feedbackType]: values[feedbackType] + 1
  });
 };
  
  const resetFeedback = () => {
    setValues({
      good: 0,
      neutral: 0,
      bad: 0
  })
}

  const totalFeedback = values.good + values.neutral + values.bad;
  const percentGoodFeedback = Math.round(((values.good + values.neutral) / totalFeedback) * 100)
  const availableFeedback = totalFeedback > 0;

  
  useEffect(() => {
    totalFeedback === 0 && resetFeedback();
  }, [totalFeedback]);

  return (
    <div>
      <Description />
      <Options
        onUpdate={updateFeedback}
        onReset={resetFeedback}
        total={totalFeedback} />
      
      {availableFeedback && (
        <Feedback
          values={values}
          total={totalFeedback}
          percent={percentGoodFeedback}
        />
      )}
      {!availableFeedback && <Notification total={totalFeedback} />}
    </div>
  );
}

export default App;