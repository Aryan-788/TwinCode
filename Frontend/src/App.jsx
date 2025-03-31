import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from 'react-simple-code-editor'
import './App.css'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";

function App() {

  const [code, setCode] = useState(` Paste your code here...
  `);

  const [review, setReview] = useState('Final review report will be displayed here');
  const [loading, setLoading] = useState(false);

  async function reviewCode(){
    setLoading(true);
    try {
     // const response = await axios.post('http://localhost:3000/ai/get-review', {code})
      const response = await axios.post('https://twincode.onrender.com/ai/get-review', {code})

      console.log(response.data)
      setReview(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    prism.highlightAll()
  }, [])
  return (
    <>
    <div className="header">
      <h2>TwinCode - Review Your Code With Dual Perspectives.</h2>
    </div>
      <main>
        <div className="left">
            <div className="code">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'black',
                  borderRadius: "5px",
                  minHeight: "100%",
                  width: "100%",
                  overflow: "auto",
                  whiteSpace: "pre",
                }}
              />
            </div>
            <div onClick={reviewCode} className="review">
              {loading ? "Loading..." : "Review"}
            </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  )
}

export default App
