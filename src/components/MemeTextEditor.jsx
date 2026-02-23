import PropTypes from "prop-types";

export default function MemeTextEditor({ label, textLabel, onTextChange }) {
  const nextFontSize = Number.isNaN(Number(textLabel.fontSize)) ? 24 : Number(textLabel.fontSize);

  return (
    <fieldset className="line-editor">
      <legend>{label}</legend>
      <input
        type="text"
        placeholder="Write meme text"
        value={textLabel.text}
        maxLength={60}
        onChange={(event) => onTextChange({ ...textLabel, text: event.target.value })}
      />

      <div className="line-editor-footer">
        <label>
          Size
          <input
            type="number"
            min={16}
            max={72}
            value={nextFontSize}
            onChange={(event) =>
              onTextChange({
                ...textLabel,
                fontSize: Math.min(72, Math.max(16, Number(event.target.value) || 16)),
              })
            }
          />
        </label>
        <span>{textLabel.text.length}/60</span>
      </div>
    </fieldset>
  );
}

MemeTextEditor.propTypes = {
  label: PropTypes.string.isRequired,
  textLabel: PropTypes.shape({
    text: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
  }).isRequired,
  onTextChange: PropTypes.func.isRequired,
};
