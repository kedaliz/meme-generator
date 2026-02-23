import MemeText from "./MemeText";
import PropTypes from "prop-types";
export default function MemePreview({
  bgColor,
  bdColor,
  textColor,
  fontFamily,
  textAlign,
  uppercase,
  textShadow,
  theLines,
}) {
  return (
    <section className="preview-panel" aria-label="Meme preview">
      <div className="meme-canvas" style={{ backgroundColor: bgColor }}>
        <div className="meme-frame" style={{ borderColor: bdColor, textAlign }}>
          {theLines.map((line, index) => (
            <MemeText
              key={index}
              text={line.text}
              fontSize={line.fontSize}
              textColor={textColor}
              fontFamily={fontFamily}
              uppercase={uppercase}
              textShadow={textShadow}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

MemePreview.propTypes = {
  bgColor: PropTypes.string.isRequired,
  bdColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  textAlign: PropTypes.oneOf(["left", "center", "right"]).isRequired,
  uppercase: PropTypes.bool.isRequired,
  textShadow: PropTypes.bool.isRequired,
  theLines: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      fontSize: PropTypes.number.isRequired,
    })
  ).isRequired,
};
