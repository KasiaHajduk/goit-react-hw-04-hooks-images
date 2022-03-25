//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Audio } from  'react-loader-spinner'

<Audio
    height="100"
    width="100"
    color='grey'
    ariaLabel='loading'
    display= 'flex'
    justify-content= 'center'
    alignItems= 'center'
    flexDirection= 'column'
  />

function Loader() {
  return <Audio/>;
}

export default Loader;
