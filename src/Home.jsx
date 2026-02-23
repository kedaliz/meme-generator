import { useState } from "react";
import MemePreview from "./components/MemePreview";
import MemeTextEditor from "./components/MemeTextEditor";

const TEMPLATE_OPTIONS = [
  {
    id: "yoda",
    name: "Yoda",
    lines: [
      { text: "Do you like Star Wars?", fontSize: 40 },
      { text: "Because", fontSize: 46 },
      { text: "YODA one for me", fontSize: 42 },
    ],
  },
  {
    id: "debug",
    name: "Debug Life",
    lines: [
      { text: "Me: quick fix", fontSize: 36 },
      { text: "The bug:", fontSize: 46 },
      { text: "surprise side quest", fontSize: 40 },
    ],
  },
  {
    id: "deadline",
    name: "Deadline Energy",
    lines: [
      { text: "Starts assignment early", fontSize: 34 },
      { text: "Also me at 2AM:", fontSize: 40 },
      { text: "what is sleep", fontSize: 46 },
    ],
  },
  {
    id: "group-project",
    name: "Group Project",
    lines: [
      { text: "Can we meet at 5?", fontSize: 35 },
      { text: "Group chat at 4:59:", fontSize: 38 },
      { text: "seen by 12", fontSize: 46 },
    ],
  },
];

const FONT_OPTIONS = ["Arial", "Georgia", "Trebuchet MS", "Courier New", "Verdana"];

const DEFAULT_STATE = {
  backgroundColor: "#e8daef",
  borderColor: "#000000",
  textColor: "#1f1f1f",
  fontFamily: "Arial",
  textAlign: "center",
  uppercase: false,
  textShadow: false,
  lines: TEMPLATE_OPTIONS[0].lines,
};

function randomColor() {
  const color = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
  return `#${color}`;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function Home() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATE_OPTIONS[0].id);
  const [memeSettings, setMemeSettings] = useState(DEFAULT_STATE);

  const handleLineChange = (lineIndex, nextLine) => {
    setMemeSettings((current) => ({
      ...current,
      lines: current.lines.map((line, index) => (index === lineIndex ? nextLine : line)),
    }));
  };

  const handleTemplateChange = (templateId) => {
    const selectedTemplate = TEMPLATE_OPTIONS.find((template) => template.id === templateId);
    if (!selectedTemplate) {
      return;
    }

    setSelectedTemplateId(templateId);
    setMemeSettings((current) => ({
      ...current,
      lines: selectedTemplate.lines,
    }));
  };

  const handleRandomize = () => {
    const randomTemplate = randomItem(TEMPLATE_OPTIONS);

    setSelectedTemplateId(randomTemplate.id);
    setMemeSettings((current) => ({
      ...current,
      backgroundColor: randomColor(),
      borderColor: randomColor(),
      textColor: randomColor(),
      fontFamily: randomItem(FONT_OPTIONS),
      textAlign: randomItem(["left", "center", "right"]),
      uppercase: Math.random() > 0.5,
      textShadow: Math.random() > 0.5,
      lines: randomTemplate.lines.map((line) => ({
        ...line,
        fontSize: Math.max(20, line.fontSize + Math.floor(Math.random() * 16) - 8),
      })),
    }));
  };

  const handleReset = () => {
    setSelectedTemplateId(TEMPLATE_OPTIONS[0].id);
    setMemeSettings(DEFAULT_STATE);
  };

  return (
    <main className="page">
      <header className="page-header">
        <h1>Meme Generator</h1>
        <p>Build, remix, and style your meme in seconds.</p>
      </header>

      <section className="workspace">
        <MemePreview
          bgColor={memeSettings.backgroundColor}
          bdColor={memeSettings.borderColor}
          textColor={memeSettings.textColor}
          fontFamily={memeSettings.fontFamily}
          textAlign={memeSettings.textAlign}
          uppercase={memeSettings.uppercase}
          textShadow={memeSettings.textShadow}
          theLines={memeSettings.lines}
        />

        <aside className="controls" aria-label="Meme editor controls">
          <h2>Design Controls</h2>

          <div className="control-row">
            <label htmlFor="template-picker">Template</label>
            <select
              id="template-picker"
              value={selectedTemplateId}
              onChange={(event) => handleTemplateChange(event.target.value)}
            >
              {TEMPLATE_OPTIONS.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div className="color-controls">
            <div className="control-row compact">
              <label htmlFor="background-color">Background</label>
              <input
                id="background-color"
                type="color"
                value={memeSettings.backgroundColor}
                onChange={(event) =>
                  setMemeSettings((current) => ({
                    ...current,
                    backgroundColor: event.target.value,
                  }))
                }
              />
            </div>

            <div className="control-row compact">
              <label htmlFor="border-color">Border</label>
              <input
                id="border-color"
                type="color"
                value={memeSettings.borderColor}
                onChange={(event) =>
                  setMemeSettings((current) => ({
                    ...current,
                    borderColor: event.target.value,
                  }))
                }
              />
            </div>

            <div className="control-row compact">
              <label htmlFor="text-color">Text</label>
              <input
                id="text-color"
                type="color"
                value={memeSettings.textColor}
                onChange={(event) =>
                  setMemeSettings((current) => ({
                    ...current,
                    textColor: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="control-row">
            <label htmlFor="font-family">Font</label>
            <select
              id="font-family"
              value={memeSettings.fontFamily}
              onChange={(event) =>
                setMemeSettings((current) => ({
                  ...current,
                  fontFamily: event.target.value,
                }))
              }
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div className="control-row">
            <label htmlFor="text-align">Alignment</label>
            <select
              id="text-align"
              value={memeSettings.textAlign}
              onChange={(event) =>
                setMemeSettings((current) => ({
                  ...current,
                  textAlign: event.target.value,
                }))
              }
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div className="toggle-controls">
            <label>
              <input
                type="checkbox"
                checked={memeSettings.uppercase}
                onChange={(event) =>
                  setMemeSettings((current) => ({
                    ...current,
                    uppercase: event.target.checked,
                  }))
                }
              />
              Uppercase text
            </label>

            <label>
              <input
                type="checkbox"
                checked={memeSettings.textShadow}
                onChange={(event) =>
                  setMemeSettings((current) => ({
                    ...current,
                    textShadow: event.target.checked,
                  }))
                }
              />
              Text shadow
            </label>
          </div>

          <div className="line-editors">
            <h3>Edit Meme Text</h3>
            {memeSettings.lines.map((line, index) => (
              <MemeTextEditor
                key={index}
                label={`Line ${index + 1}`}
                textLabel={line}
                onTextChange={(nextLine) => handleLineChange(index, nextLine)}
              />
            ))}
          </div>

          <div className="button-row">
            <button type="button" className="btn primary" onClick={handleRandomize}>
              Randomize
            </button>
            <button type="button" className="btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}
