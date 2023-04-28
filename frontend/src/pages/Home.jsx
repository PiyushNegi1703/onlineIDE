import { useRef, useState } from "react";

const Home = () => {
  const [code, setCode] = useState("int main(){\n\n}");
  const [output, setOutput] = useState("Your output will appear here");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const textareaRef = useRef(null);

  function handleKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      const selectionStart = textareaRef.current.selectionStart;
      const selectionEnd = textareaRef.current.selectionEnd;
      const text =
        code.slice(0, selectionStart) + "  " + code.slice(selectionEnd);
      setCode(text);
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
        selectionStart + 2;
    }
  }

  let codeStr = "#include <bits/stdc++.h>\nusing namespace std;";

  let str = code.split("\n");

  for (let i = 0; i < str.length; i++) {
    codeStr += str[i];
  }

  const Body = {
    code: codeStr,
    language: "cpp",
    user_input: input
  };

  const handleClick = async () => {
    await fetch(`${import.meta.env.VITE_API}submit/`, {
      method: "POST",
      body: JSON.stringify(Body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      },
    });

    const getOutput = async () => {
      const response = await fetch(`${import.meta.env.VITE_API}submit/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });

      const json = await response.json();
      // console.log(json)

      // if(json.length !== 0) {
      //   codeArr = json
      // }

      if (json[json.length - 1].status === "P") {
        setLoading(true);
        setTimeout(() => {
          getOutput();
        }, 3000);
      } else {
        setOutput(json[json.length - 1].output);
        setLoading(false);
      }
      if(json[json.length - 1].status === "E") {
        setError(true)
      }
    };

    getOutput();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div className="code-container">
        <h1>Algo IDE for CPP</h1>
        <p
          style={{ backgroundColor: "#3b3b3b", color: "white", width: "63%" }}
        >
          #include &lt;bits/stdc++.h&gt;
        </p>
        <p
          style={{ backgroundColor: "#3b3b3b", color: "white", width: "63%" }}
        >
          using namespace std;
        </p>
        <textarea
          ref={textareaRef}
          value={code}
          onKeyDown={handleKeyDown}
          onChange={(e) => setCode(e.target.value)}
          // defaultValue={"int main(){\n\n}"}
          cols="90"
          rows="40"
          id="code-editor"
        ></textarea>
        <button
          onClick={handleClick}
          disabled={loading}
          className={loading ? "dis-button" : ""}
        >
          {loading ? "Compiling" : "Submit"}
        </button>
        {/* <button onClick={getOutput}>Get Output</button> */}
      </div>
      <div className="io-container">
        <div className="input-container">
          <label>
            Custom Input
            <input type="text" onChange={(e) => setInput(e.target.value)} />
          </label>
        </div>
        <div className="output-container">
          <p style={{ marginBottom: "1em" }}>OUTPUT</p>
          <span className={error ? "error" : ""}>{output}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
