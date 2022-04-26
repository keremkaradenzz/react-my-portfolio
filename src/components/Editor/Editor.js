import React, { useState } from 'react'
import Editor from 'react-simple-code-editor';
import dedent from 'dedent';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import './styles.css'

const MyEditor = () => {
    const [codes, setCodes] = useState({
        code: dedent`import React from "react";
        import ReactDOM from "react-dom";
        
        function App() {
          return (
            <h1>Hello world , I'm Front End Developer</h1>
          );
        }
        
        ReactDOM.render(<App />, document.getElementById("root"));
        `
    }
    )


    return (
        <div>
            <Editor
                value={codes.code}
                onValueChange={code => setCodes({ code })}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 16,
                    fontWeight:500,
                }}
            />
        </div>
    )

}

export default MyEditor;