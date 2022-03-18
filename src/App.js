import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url="http://localhost:9000/crawlable_catalogue/";



function App() {
  const [data, setData] = useState({ links: [] });

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios( url + "collections.json");
      if (!ignore) setData(result.data);
    }

    fetchData();
    return () => { ignore = true; }
  });





  return (


      <div className="container">
        <div className="jumbotron bg-dark text-white">
          <h1>{data.title}</h1>      
          <p>{data.description}.</p>
        </div>
 

        <div className="row">

        {data.links.map((item,index) => (

        <div className="col-sm-6" key={index}>
          <div className="card">
            <div className="card-body">

              <h5 className="card-title">{item.href.substring(0, item.href.lastIndexOf('/'))}</h5>
              <p className="card-text">Click bellow to explore this record collection.</p>
              <a href={url + item.href}  className="btn btn-primary">Open collection</a>
            </div>
          </div>
        </div>

      ))
      }

        </div>

      <br></br>
        <footer className="mt-auto">
          <a href="https://byteroad.net">&copy; ByteRoad 2022</a>
        </footer>

      </div> 




      
  );
}

export default App;
