import PropTypes from "prop-types";

export default function MemeText({ text, fontSize, textColor, fontFamily, uppercase, textShadow }) {
  return (
    <p
      style={{
        fontWeight: "700",
        fontSize,
        color: textColor,
        fontFamily,
        textTransform: uppercase ? "uppercase" : "none",
        textShadow: textShadow ? "1px 1px 2px rgba(0, 0, 0, 0.35)" : "none",
        margin: "0.4rem 0",
        lineHeight: 1.2,
        wordBreak: "break-word",
      }}
    >
      {text}
    </p>
  );
}

MemeText.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  textColor: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  uppercase: PropTypes.bool.isRequired,
  textShadow: PropTypes.bool.isRequired,
};
