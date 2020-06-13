import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import "./App.css";
import {
  EuiButton,
  EuiFlexGroup,
  EuiComboBox,
  EuiFlexItem,
  EuiCard,
  EuiIcon,
} from "@elastic/eui";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfMunicipios: {
        municipios: [],
      },
      selectedOption: [{ label: "Barcelona" }],
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
      return { label: e.NOMBRE };
    });
  };

  onChange = (newOption) => {
    this.setState({
      selectedOption: newOption,
    });
  };


  search = () => {
    console.log("button works");
  }

  render() {
    return (
      <div className="App">
        <EuiComboBox
          placeholder="Select a single option"
          singleSelection={{ asPlainText: true }}
          options={this.getLabels()}
          selectedOptions={this.state.selectedOption}
          onChange={this.onChange}
          isClearable={false}
        />
        <EuiButton onClick={this.search}>Search</EuiButton>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiIcon size="xxl" type={`logo`} />}
              title={this.state.selectedOption[0].label}
              layout={"vertical"}
              display={"panel"}
              description="12 celsius 58% chance of rain"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}

export default App;
