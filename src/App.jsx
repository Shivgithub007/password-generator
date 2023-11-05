import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { AiOutlineCheck } from "react-icons/ai";
function App() {
  const [length, setLength] = useState(1);
  const [characters, setCharacters] = useState(false);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    let pass = "";
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) char += "0123456789";
    if (characters) char += "!@#$%^&*()-_=+[]{}|;:'\",.<>?";

    for (let i = 1; i <= length; i++) {
      let n = Math.floor(Math.random() * char.length) + 1;
      pass += char.charAt(n);
    }
    setPassword(pass);
  }, [length, characters, number, setPassword]);

  const copyPassword = useRef(null);

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(copyPassword.current.value);
    setCopy(!copy);
    setTimeout(()=>{
      setCopy((prev)=>!prev);
    },3000)
  }, [password]);

  return (
    <>
      <h1 className="text-center text-4xl text-white mt-5 mb-5">
        Password Generator
      </h1>
      <div className="text-center text-white">
        <div className="mb-6">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="p-2 rounded-md text-black"
            ref={copyPassword}
            readOnly
          />
          <button
            className="text-white bg-blue-600 p-2 ms-3 w-16 rounded-md text-middle justify-center align-middle"
            onClick={copyToClipboard}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="p-1"
            >
              {copy ? <AiOutlineCheck /> : "Copy"}
            </span>
          </button>
        </div>
        <div className="flex justify-center align-middle">
          <div className="me-3 ms-3">
            <input
              type="range"
              min="1"
              max="12"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="ms-1 ">Length {length}</label>
          </div>
          <div className="me-3 ms-3">
            <input
              type="checkbox"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
              checked={number}
            ></input>
            <label className="ms-1">Numbers</label>
          </div>
          <div className="me-3 ms-3">
            <input
              type="checkbox"
              checked={characters}
              onChange={() => {
                setCharacters((prev) => !prev);
              }}
            ></input>
            <label className="ms-1">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
