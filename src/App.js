import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import "./App.css";
import {
  EuiComboBox,
  EuiCard,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
} from "@elastic/eui";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfMunicipios: { municipios: [] },
      selectedOption: [{ label: "Barcelona", municipioId: "08019" }],
      actualTemp: null,
      rainPropability: null,
    };
  }

  componentDidMount() {
    this.getMunicipios();
  }

  getMunicipios = (event) => {
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
      return { label: e.NOMBRE, municipioId: e.CODIGOINE };
    });
  };

  getWeather = (municipioId) => {
    let url = `//www.el-tiempo.net/api/json/v2/provincias/08/municipios/${municipioId.substring(
      0,
      5
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          actualTemp: data.temperatura_actual,
          rainPropability: data.lluvia,
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
                    <h2>Barcelona's municipios weather</h2>
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
                  icon={<EuiIcon size="xxl" type={`logo`} />}
                  title={this.state.selectedOption[0].label}
                  layout={"vertical"}
                  display={"panel"}
                  description={`${this.state.actualTemp} celsius ${this.state.rainPropability} % chance of rain`}
                />
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
    );
  }
}

export default App;
