import Spinner from "react-bootstrap/Spinner";

export function Loader() {
  return (
    <>
      <Spinner animation="grow"  variant="dark"  />
      <Spinner animation="grow"  variant="dark"  />
      <Spinner animation="grow" variant="dark"  />
    </>
  );
}

export default Loader;
