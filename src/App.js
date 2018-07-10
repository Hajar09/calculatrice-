import React, { Component } from 'react';
import './App.css';
import Touche from "./components/Touche"

class App extends Component {
  state = {
    input: "",
    clickEgal: false,
    touches: [
      0, 1, 2 ,"+", 3, 4, 5, "*", 6, 7, 8, "-", 9, "/", "c", ".", "="
    ]
  }

recupTouches = (e)=>{
    const touch = e.currentTarget.value//valeur de la touche cliquée
    if(touch === "=") { //si on clique sur "=", on calcule nos valeurs et clickegal devient vrai
      this.setState({input: eval(this.state.input), clickEgal: true})
    }
    else if(touch === "c") {//ici la condition pour effacer le input
      this.setState({
        input:""
      })
    }
    else {
      if(this.state.clickEgal) {//si clickegal est vrai, le input prend la valeur de la touche sur laquelle on vient de cliquer et le clickEgal doit revenir à false
        if (/[0-9]/.test(touch)) this.setState({input:touch, clickEgal:false})//pour bloquer l'utilisation des opérateurs (mais incomplet)
        else this.setState({input:"", clickEgal:false})
      }
      else {
        if(
          ((/[0-9]/.test(touch)) //si c'est un nombre (valeur du input)
          || //ou
          (!/[0-9]/.test(touch) && /[0-9]/.test(this.state.input.slice(-1)))) //si c'est pas un nombre "et" et que la dernière valeur du input est un nombre
          ||//ou
          (this.state.input === "" && /[0-9]/.test(touch))//si le input est vide "et" que la valeur est un nombre
        ){
          this.setState({input: this.state.input + touch})//cas de base (calcul de nos valeurs)
        }
      }
    }
  }



  render() {
    const afficheTouches = this.state.touches.map((touch,i) => {
      return <Touche key={i} touche={touch} recupTouches={this.recupTouches}/>
    })

    return (
      <div className="App">
        <input type="text" id="result" value={this.state.input} /><br />
        {afficheTouches}
      </div>
    );
  }
}

export default App;
