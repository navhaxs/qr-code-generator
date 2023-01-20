import React, { useEffect, useState } from 'react';
import './App.css';
import QRCode from 'qrcode';

function App() {
  const myRef = React.createRef();
  const urlSearchParams = new URLSearchParams(window.location.search);

  const param = urlSearchParams.get('data');
  const [data, setData] = useState(param && decodeURI(param));
  useEffect(() => {

    const canvas = myRef && myRef.current;
    if (canvas) {

      if (data) {

        QRCode.toCanvas(canvas, data, { scale: 9 }, function (error) {
          if (error) console.error(error)
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
