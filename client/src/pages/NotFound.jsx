import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="not-found-page">
        <div className="noise"></div>
        <div className="overlay"></div>
        <div className="terminal">
          <h1 className="text-3xl">
            Error <span className="errorcode">404</span>
          </h1>
          <p className="output">
            The page you are looking for might have been removed, had its name
            changed or is temporarily unavailable.
          </p>
          <p className="output">
            Please try to{" "}
            <button
              onClick={() => navigate(-1)}
              className="text-white italic uppercase"
            >
              go back
            </button>{" "}
            or{" "}
            <button
              onClick={() => navigate("/")}
              className="text-white italic uppercase"
            >
              return to the homepage
            </button>
            .
          </p>
          <p className="output">Good luck.</p>
        </div>
      </div>
    </>
  );
}
