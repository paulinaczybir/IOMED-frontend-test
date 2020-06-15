import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import "./App.css";
import {
  EuiComboBox,
  EuiCard,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiTextColor
} from "@elastic/eui";

var he = require('he');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfMunicipios: { municipios: [] },
      selectedOption: [{ label: "Barcelona", municipioId: "08019" }],
      actualTemp: "",
      rainProbability: "",
    };
  }

  componentDidMount() {
    this.getMunicipios();
    this.getWeather("08019");
  }

  getMunicipios = () => {
    let url = `//www.el-tiempo.net/api/json/v2/provincias/08/municipios`;

    fetch(url)  
      .then((response) => response.json())
      .then((data) => {
        this.setState({ listOfMunicipios: data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  getLabels = () => {
    return this.state.listOfMunicipios.municipios.map((e) => {
      return { label: he.decode(e.NOMBRE), municipioId: e.CODIGOINE };
    });
  };

  getWeather = (municipioId) => {
    let url = `//www.el-tiempo.net/api/json/v2/provincias/08/municipios/${municipioId.substring(0,5)}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          actualTemp: data.temperatura_actual,
          rainProbability: data.lluvia,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  onChange = (newOption) => {
    this.setState({
      selectedOption: newOption,
    });
    this.getWeather(newOption[0].municipioId);
  };

  render() {
    return (
        <EuiPage>
          <EuiPageBody component="div">
            <EuiPageContent
              verticalPosition="center"
              horizontalPosition="center"
            >
              <EuiPageContentHeader>
                <EuiPageContentHeaderSection>
                  <EuiTitle>
                    <h2><EuiTextColor color="secondary">Barcelona's municipios weather</EuiTextColor></h2>
                  </EuiTitle>
                </EuiPageContentHeaderSection>
              </EuiPageContentHeader>
              <EuiPageContentBody>
                {" "}
                <EuiComboBox
                  placeholder="Select a single option"
                  singleSelection={{ asPlainText: true }}
                  options={this.getLabels()}
                  selectedOptions={this.state.selectedOption}
                  onChange={this.onChange}
                  isClearable={false}
                />
                <EuiCard
                  title={this.state.selectedOption[0].label}
                  layout={"vertical"}
                  display={"panel"}
                  description={<div><p>{`${this.state.actualTemp} °C`}</p>
                  <p>{`${this.state.rainProbability} % Chance of rain`}</p></div>}
                />
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
    );
  }
}

export default App;
