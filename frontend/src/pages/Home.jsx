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
    user_input: input,
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
        setError(false)
      }
      if (json[json.length - 1].status === "E") {
        setError(true);
      }
    };

    getOutput();
  };

  return (
    <>
      <h1>Algo IDE for CPP</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "70vh"
        }}
      >
        <div className="code-container">
          <p>
            #include &lt;bits/stdc++.h&gt;
          </p>
          <p>
            using namespace std;
          </p>
          <br />
          <span style={{color: "rgba(255, 255, 255, 0.4)", fontStyle: "italic"}}>// write your code logic below</span>
          <br />
          <textarea
            ref={textareaRef}
            value={code}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCode(e.target.value)}
            cols="40"
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
              {/* <br /> */}
              <textarea type="text" onChange={(e) => setInput(e.target.value)} />
            </label>
          </div>
          <div className="output-wrapper">
            <p style={{color: "rgba(0, 0, 0, 0.5)", fontWeight: "700", fontSize: "1.2em", width: "100%", margin: "0px"}}>Output</p>
            <div className="output-container">
              <span className={error ? "error" : "output"}>{output}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
