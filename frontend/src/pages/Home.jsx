import { useState } from "react";

const Home = () => {
  const [code, setCode] = useState("int main(){\n\n}");
  const [output, setOutput] = useState('Your output will appear here')
  let codeStr = "#include <bits/stdc++.h>\nusing namespace std;";

  let str = code.split("\n");

  for (let i = 0; i < str.length; i++) {
    codeStr += str[i];
  }

  const Body = {
    "code": codeStr,
    "language": "cpp"
  }

  const handleClick = async() => {
    await fetch(`${import.meta.env.VITE_API}submit/`, {
      method: "POST",
      body: JSON.stringify(Body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      }
    })
  }
  
  const getOutput = async() => {
    const response = await fetch(`${import.meta.env.VITE_API}submit/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      }
    })
  
    const json = await response.json()
    console.log(json)
    setOutput(json[json.length - 1].output)
  }

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
        <p>#include &lt;bits/stdc++.h&gt;</p>
        <p>using namespace std;</p>
        <textarea
          onChange={(e) => setCode(e.target.value)}
          defaultValue={"int main(){\n\n}"}
          cols="90"
          rows="40"
          id="code-editor"
        ></textarea>
        <button onClick={handleClick}>Submit</button>
        <button onClick={getOutput}>Get Output</button>
      </div>
      <div className="output-container">
        <p style={{marginBottom: "1em"}}>OUTPUT</p>
        <span>{output}</span>
      </div>
    </div>
  );
};

export default Home;
