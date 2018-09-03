class Root extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.setState({});
    $.getJSON('/api', (data) => {this.setState({tf: data})});
  }

  renderComment() {
    if (this.state.tf.Comment) {
      return (
        <div id="comment">
          <h2 className="title">Comment</h2>
          <code>{this.state.tf.Comment}</code>
        </div>
      )
    }
  }

  parseInput(entry) {
    if (entry[0] === "Name") {
      <React.Fragment/>
    } else if (entry[0] === "Description") {
      entry[1] !== "" ? (
        <div className="variable-entry" key={entry[0]}>
          <h4>{`${entry[0]}: `}</h4>
          {`${entry[1]}`}
        </div>
      ) : (<React.Fragment key={entry[0]}/>);
    } else if (entry[0] === "Default") {
      let default_obj = entry[1];
      return default_obj !== null ? (
        <div className="variable-entry" key={entry[0]}>
          <h4>Default:</h4>
          <b>Type: </b>{`${default_obj.Type}`}<br/>
          <b>Value: </b><code>{`"${default_obj.Literal}"`}</code>
        </div>
      ) : (<React.Fragment key={entry[0]}/>);
    } else {
      return (
        <div className="variable-entry" key={entry[0]}>
          <h4>{`${entry[0]}: `}</h4>
          {`${entry[1]}`}
        </div>
      );
    }
  }

  renderInputs() {
    if (this.state.tf.Inputs) {
      return (
        <div id="inputs">
          <h2 className="title">Inputs</h2>
          {
            this.state.tf.Inputs.map((input) => {
              return (
                <div className="box column content variable" key={input.Name}>
                  <h3 className="subtitle">{input.Name}</h3>
                  { Object.entries(input).map(this.parseInput) }
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  renderOutputs() {
    if (this.state.tf.Outputs) {
      return (
        <div id="outputs">
          <h2 className="title">Outputs</h2>
          {this.state.tf.Outputs.map((output) => (
            <div className="box column content output" key={output.Name}>
              <h3 className="subtitle">{`${output.Name}`}</h3>: {`${output.Description}`}
            </div>
          ))}
        </div>
      )
    }
  }

  render() {
    if (this.state === undefined || this.state === null ||
        this.state.tf === undefined) {
      return (<div className="container"/>)
    } else {
      return (
        <div className="container">

          <div className="columns"> {this.renderComment()} </div>
          <div className="columns"> {this.renderInputs()} </div>
          <div className="columns"> {this.renderOutputs()} </div>

        </div>
      )
    }
  }
}

ReactDOM.render(<Root/>, document.getElementById('react-root'))
