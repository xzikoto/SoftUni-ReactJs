import ReactEmojis from "@souhaildev/reactemojis";

export default function Like({ onClick, disabled }) {
  const emojiStyle = {
    height: 35,
    width: 35,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    color: disabled ? "#d3d3d3" : "inherit",
    pointerEvents: disabled ? "none" : "auto",
  };
  return (
    <>
      <ReactEmojis
        onClick={!disabled ? onClick : null}
        emoji="👍"
        emojiStyle="1"
        style={emojiStyle}
      />
    </>
  );
}
