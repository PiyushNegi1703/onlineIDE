import { useState } from "react";
import "./App.css";
// import Editor from "@monaco-editor/react";

function App() {
  const [code, setCode] = useState("int main(){\n\n}");
  let codeStr = "#include <bits/stdc++.h>\\nusing namespace std;";
  // function enableTab(id) {
  //   var el = document.getElementById(id);
  //   el.onkeydown = function (e) {
  //     if (e.code === "Tab") {
  //       // tab was pressed

  //       // get caret position/selection
  //       var val = this.value,
  //         start = this.selectionStart,
  //         end = this.selectionEnd;

  //       // set textarea value to: text before caret + tab + text after caret
  //       this.value = val.substring(0, start) + "\t" + val.substring(end);

  //       // put caret at right position again
  //       this.selectionStart = this.selectionEnd = start + 1;

  //       // prevent the focus lose
  //       return false;
  //     }
  //   };
  // }
  // enableTab("code-editor");
  let str = code.split('\n')

  for(let i=0; i<str.length; i++) {
    codeStr += str[i];
  }

  return (
    <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
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
        <button onClick={() => console.log(codeStr)}>Submit</button>
      </div>
      <div className="output-container">
        <p>OUTPUT</p>
        <span></span>
      </div>
    </div>
  );
}

export default App;
