import { useState, useEffect } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";

export default function App() {
  const [maindata, setMaindata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [inputState, setInputState] = useState({
    text: "This is Label",
    x: "",
    y: "",
    fontSize: "",
    fontWeight: "",
  });
  const [selectedInputIndex, setSelectedInputIndex] = useState(null);
  const [isInputActive, setIsInputActive] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("maindata")) || [];
    setMaindata(savedData);
  }, []);

  // Save data to local storage whenever maindata changes
  useEffect(() => {
    if (maindata.length > 0)
      localStorage.setItem("maindata", JSON.stringify(maindata));
  }, [maindata]);

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const id = e.dataTransfer.getData("text/plain");
    const x = e.clientX;
    const y = e.clientY;
    console.log("pos", x, y);
    console.log(id);
    let newData = [...maindata];
    let current = newData.find((data) => data.id == id);
    if (current) {
      current.x = x + "px";
      current.y = y + "px";
    } else {
      newData.push({
        id: newData.length, // Assign a unique id to each input
        text: "", // Initialize text as an empty string for each input
        x: x + "px",
        y: y + "px",
      });
      setSelectedInputIndex(newData.length - 1);
      setShowModal(true);
    }

    setMaindata(newData);

    setInputState({
      text: "This is label", // Reset other modal values
      x: x + "px",
      y: y + "px",
      fontSize: "",
      fontWeight: "",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    console.log("delete");
    let newData = [...maindata];
    newData.splice(selectedInputIndex, 1);
    setMaindata(newData);
    setSelectedInputIndex(null); // Deselect after deletion
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    const isValidFontSize = /^[0-9]*$/.test(inputState.fontSize);

    if (!isValidFontSize) {
      console.error("Invalid font size. Please enter a number.");
      return;
    }

    let newData = [...maindata];
    newData[selectedInputIndex] = {
      ...newData[selectedInputIndex],
      ...inputState,
    };
    setMaindata(newData);

    handleCloseModal();
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  return (
    <div className="App">
      <Sidebar />

      <div id="dropZone" className="form-control fields">
        {maindata.map((input, index) => (
          <div key={input.id}>
            <input
              id={`input-${input.id}`}
              type={input.data}
              value={input.text}
              draggable={true}
              className="draggable-element dragging"
              style={{
                position: "absolute",
                color: "black",
                background: "#fff",
                minWidth:"100px",
                margin: "2px",
                fontSize: input.fontSize,
                fontWeight: input.fontWeight,
                left: input.x,
                top: input.y,
                outline: "none",
                border: selectedInputIndex === index && isInputActive ? "2px solid red" : "none", // Set the border to "none" by default

              }}
              onClick={() => {
                setSelectedInputIndex(index);
                setInputState({
                  text: input.text,
                  x: input.x,
                  y: input.y,
                  fontSize: input.fontSize,
                  fontWeight: input.fontWeight,
                });
                setIsInputActive(true);
              }}
              onFocus={() => {
                setIsInputActive(true);
              }}
              onBlur={() => {
                setIsInputActive(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setShowModal(true);
                } else if (e.key === "Delete" && selectedInputIndex !== null) {
                  handleDelete();
                }
              }}
              onDragStart={(e) => handleDragStart(e, input.id)}
            />
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Label: {modalContent}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleModalSubmit}>
            <Form.Group controlId="text" className="mb-3">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={inputState.text}
                onChange={(e) =>
                  setInputState({ ...inputState, text: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="x" className="mb-3">
              <Form.Label>X</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter X"
                value={inputState.x}
                onChange={(e) =>
                  setInputState({ ...inputState, x: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="y" className="mb-3">
              <Form.Label>Y</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Y"
                value={inputState.y}
                onChange={(e) =>
                  setInputState({ ...inputState, y: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="fontSize" className="mb-3">
              <Form.Label>Font Size</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Font Size"
                value={inputState.fontSize}
                onChange={(e) =>
                  setInputState({ ...inputState, fontSize: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="fontWeight" className="mb-4">
              <Form.Label>Font Weight</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Font Weight"
                value={inputState.fontWeight}
                onChange={(e) =>
                  setInputState({ ...inputState, fontWeight: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <body onDragOver={allowDrop} onDrop={handleDrop} style={{ minHeight: "100vh" }}>
        {/* Rest of your app content */}
      </body>
    </div>
  );
}
