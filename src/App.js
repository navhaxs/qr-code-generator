import React, { useEffect, useState } from 'react';
import './App.css';
import QRCode from 'qrcode';

function App() {
  const myRef = React.createRef();
  const urlSearchParams = new URLSearchParams(window.location.search);

  const param = urlSearchParams.get('data');
  const [isValid, setIsValid] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [data, setData] = useState(param ? decodeURI(param) : '');
  useEffect(() => {

    setIsValid(data != '');

    const canvas = myRef && myRef.current;
    if (canvas) {

      if (data != '') {

        canvas.style.display = null;
        setErrorMessage(null);

        QRCode.toCanvas(canvas, data, { scale: 9 }, function (error) {
          if (error) {
            console.error(error);
            setErrorMessage(error.message);
            canvas.style.display = 'none';
          }
        })

      }
      else {

        setErrorMessage(null);
        canvas.style.display = 'none';

      }

    }
  }, [data, isValid]);

  const updateData = (newData) => {
    setData(newData || '');
    if (window.history.pushState) {
      let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      if (newData) {
        newurl += '?data=' + encodeURI(newData);
      }
      window.history.replaceState({ path: newurl }, '', newurl);
    }
  }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <header className="App-header">
        <canvas ref={myRef} />
        { !errorMessage && isValid && <p>To save: right click &gt; Save Image As</p> }
        { errorMessage && <p className='errorMessage'>{errorMessage}</p> }
      </header>
      <div className="Entry">
      <textarea placeholder={`(paste web address url here)\n\ne.g. https://example.com`} onChange={(e) => { updateData(e.target.value); }}
        value={data} />
      </div>
      <div className="Links">
        <a href="https://github.com/navhaxs/qr-code-generator">source</a> | <a href="https://wificard.io/">wificard.io</a>
      </div>
    </div>
  );
}

export default App;
