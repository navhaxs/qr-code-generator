import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import QRCode from 'qrcode';

function App() {
  const myRef = React.createRef();
  const urlSearchParams = new URLSearchParams(window.location.search);

  // // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   //document.title = `You clicked ${data} times`;
  // });

  const param = urlSearchParams.get('data');
  const defaultData = param && decodeURI(param) || 'https://example.com';
  const [data, setData] = useState(param && decodeURI(param));
  useEffect(() => {

    const canvas = myRef && myRef.current;
    if (canvas) {

      if (data) {

        QRCode.toCanvas(canvas, data, { scale: 9 }, function (error) {
          if (error) console.error(error)
          console.log('success!');
        })

      }
      else {

        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

    }
  }, [data]);

  const a = (m) => {
    setData(m);
    if (window.history.pushState) {
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?data=' + encodeURI(m);
      window.history.replaceState({ path: newurl }, '', newurl);
    }
  }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <header className="App-header">
        <canvas ref={myRef} />
        <p>To save: right click &gt; Save Image As</p>
      </header>
      <div className="Entry">
      <textarea placeholder='https://example.com (paste full url here)' onChange={(e) => { a(e.target.value); }}
        value={data} />
      </div>
    </div>
  );
}

export default App;
