import { MultistepProps } from '../utils/Types';
import './Multistep.css';

function Multistep({ steps }: MultistepProps) {
  return (
    <div className="multistep">
      {steps.map(step => (
        <div className={`step step--${step.state}`}>
          {step.text}
        </div>
      ))}
    </div>
  );
}

export default Multistep;
