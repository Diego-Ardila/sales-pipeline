import { MultistepProps } from '../utils/Types';
import './Multistep.css';

function Multistep({ steps }: MultistepProps) {
  return (
    <div className="multistep">
      {steps.map(step => (
        <div key={step.text} className={`step step--${step.state}`}>
          {step.text}
        </div>
      ))}
    </div>
  );
}

export default Multistep;
