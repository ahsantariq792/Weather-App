import './App.css';
import { useState, useEffect, useRef } from "react"
import axios from 'axios';
import Nav from './components/nav';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Container, Card, Row, Col } from 'react-bootstrap';


function App() {
  const [weather, setweather] = useState(null)

  // const [cityName, setCityName] = useState("karachi")
  const cityName = useRef(null);

  const [location, setLocation] = useState(null)

  const [submit, setSubmit] = useState(false)

  useEffect(() => {

    let name = "";

    if (cityName.current.value) {
      name = `q=${cityName.current.value}`
    } else if (location) {

      if (!location) {

      } else if (location === "fail") {
        name = "q=new york";
      } else if (location && location.latitude) {
        name = `lat=${location.latitude}&lon=${location.longitude}`
      }
    }

    console.log("name: ", name)
    if (name) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?${name}&appid=363a0329911c1b074081245aae1023c3&units=metric`)
        .then(res => {
          const newWeather = res.data;
          setweather(newWeather);
        });
    }

  }, [submit, location]);


  useEffect(() => {

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("position got: ", position.coords.latitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })

        }, function (error) {

          setLocation("fail")

        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    getLocation()

  }, []);

  return (
    <div className="box">
      <Nav />
      <div>
        <Container fluid="md" >
          {/* <input onChange={(e) => {
        console.log("e: ", e.target.value)
        setCityName(e.target.value)
      }} /> */}
          <div className="searchbar">
            <input className="form-control w-50" ref={cityName} />


            <Button className="btn" variant="success" onClick={() => {

              console.log("name: ", cityName.current.value)

              setSubmit(!submit)

            }} >Submit</Button>
          </div>
          <br />

          {/* <h1>{weather?.main?.temp}</h1> */}

          {
            (weather !== null) ?
              <>

                <Card className="text-center card shadow p-3 mb-5 rounded">
                  <Card.Header className="header"><h2> City: {weather?.name}</h2>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Your location <br />

                      <Container>
                        <Row>
                          <Col>Lat: {location.latitude}</Col>
                          <Col>Long: {location.longitude}</Col>
                        </Row>
                      </Container>


                    </Card.Title>
                    <hr />
                    <Card.Text>

                      <h1 className="temperature">{weather?.main?.temp} &#8451;</h1>
                      <h5>{weather?.weather[0]?.description}</h5>
                      <h3>Country: {weather.sys.country}</h3>
                      <hr />
                      <h5>Pressure: {weather?.main?.pressure} Pa</h5>
                      <h5>Wind Speed: {weather?.wind?.speed} m/s </h5>
                      <h5>Humidity: {weather?.main?.humidity} g/kg </h5>
                    </Card.Text>
                  </Card.Body>
                </Card>

              </>
              :
              <h1>Loading...</h1>
          }
      </Container>

      </div>

    </div>
  );
}
export default App;