/* eslint-disable react/prop-types */
export default function ToggleButton({ isOpen, ...rest }) {
  return (
    <button className="btn-toggle" {...rest}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
