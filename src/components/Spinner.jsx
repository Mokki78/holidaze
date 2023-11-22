import Spinner from "react-bootstrap/Spinner";

export function Loader() {
  return (
    <>
      <Spinner animation="border" variant="dark" />
      <Spinner animation="border" variant="dark" />
      <Spinner animation="border" variant="dark" />
    </>
  );
}

export default Loader;
