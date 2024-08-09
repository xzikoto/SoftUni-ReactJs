import ReactEmojis from "@souhaildev/reactemojis";

export default function Like({ onClick }) {
  return (
    <>
      <ReactEmojis
        onClick={onClick}
        emoji="👍"
        style={{ width: 50, height: 50 }}
      />
    </>
  );
}
