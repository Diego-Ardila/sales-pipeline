import { AiOutlineLoading3Quarters } from "react-icons/ai";
import './Loader.css';

function Loader({color}: {color?: string}) {
  
  return (
    <div className="loader">
      <AiOutlineLoading3Quarters style={{color}}/>
    </div>
  );
}

export default Loader;
