import Spinner from "react-bootstrap/Spinner";

export function Loader() {
  return (
    <>
      <Spinner animation="grow"  variant="info"  />
      <Spinner animation="grow"  variant="info"  />
      <Spinner animation="grow" variant="info"  />
    </>
  );
}

export default Loader;
