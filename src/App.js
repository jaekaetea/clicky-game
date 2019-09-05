//import React from 'react';
//import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
import Header from "./components/Header";
import Instructions from "./components/Instructions";
import Cats from "./components/Cats";
import List from "./List.json";
import BeforeFooter from "./components/BeforeFooter";
import Footer from "./components/Footer";

//y u break when deploy?
import cat01 from "./pics/cat01.png"
import cat02 from "./pics/cat02.png"
import cat03 from "./pics/cat03.png"
import cat04 from "./pics/cat04.png"
import cat05 from "./pics/cat05.png"
import cat06 from "./pics/cat06.png"
import cat07 from "./pics/cat07.png"
import cat08 from "./pics/cat08.png"
import cat09 from "./pics/cat09.png"
import cat10 from "./pics/cat10.png"
import cat11 from "./pics/cat11.png"
import cat12 from "./pics/cat12.png"

let score = 0;
let topScore = 0;

class App extends Component {
  state = {
    List,
    score: 0, 
    topScore: 0,
    message: "Click an Image to Begin!"
  };

  clicky = (kitty) => {
    const List = this.state.List;
    const clicked = List.filter(List => List.id === kitty.id);

    if (clicked[0].state === "1") {
      for (var i = 0; i < List.length; i++) {
        List[i].state = "0";
      }

      score = 0;
      this.setState({
        List: List,
        score: 0,
        message: "You guessed incorrectly!"
      });
    }
    else {
      clicked[0].state = "1";

      score++;
      if (score > topScore) {
        topScore = score;
        this.setState({ topScore })
      }

      this.setState({
        score: score,
        message: "You guessed correctly!"
      });
      this.shuffle({ List });
      this.setState({ List });

      if (score === 12) {
        this.setState({
          message: "Meow Chicken Meow Meow!  You won!"
        });
        alert("Meow Chicken Meow Meow!  You won!");
      }
    }
  };

  shuffle = array => {
    array = List;
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  render() {
    return (
      <div>
        <Header score={this.state.score} topScore={this.state.topScore} message={this.state.message}/>
        <Instructions/>
        <div className="container">
          {this.state.List.map(kitty => (
            <Cats src={kitty.src} id={kitty.id} state={kitty.state} clicky={this.clicky}/>
          ))}
        </div>
        <BeforeFooter/>
        <Footer/>
      </div>
    );
  }
}

export default App;