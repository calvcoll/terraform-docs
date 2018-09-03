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
          <code>
            {this.state.tf.Comment.split('\n').map((line) => {
              return (
                <React.Fragment>
                  {line}
                  <br/>
                </React.Fragment>
              )
            })}
          </code>
        </div>
      )
    }
  }

  parseInput(entry) {
    if (entry[0] === "Name") {
      <React.Fragment/>
    } else if (entry[0] === "Description") {
      return entry[1] !== "" ? (
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
        <div id="columns inputs">
          <h2 className="title">Inputs</h2>
          {
            this.state.tf.Inputs.map((input) => {
              const isRequired = input.Default !== null ? " is-primary" : "";
              return (
                <div className="panel content variable" key={input.Name}>
                  <p className={"panel-heading" + isRequired}>
                    <span class="icon has-text-warning">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                    {input.Name}
                  </p>
                  <div className="panel-block">
                    { Object.entries(input).map(this.parseInput) }
                  </div>
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
        <div id="columns outputs">
          <h2 className="title">Outputs</h2>
          {this.state.tf.Outputs.map((output) => (
            <div className="panel content output" key={output.Name}>
              <p className="panel-heading">{`${output.Name}`}</p>
              <p className="panel-block">{`${output.Description}`}</p>
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
        <React.Fragment>
          <div className="section">{this.renderComment()}</div>
          <div className="section">{this.renderInputs()}</div>
          <div className="section">{this.renderOutputs()}</div>
        </React.Fragment>
      )
    }
  }
}

ReactDOM.render(<Root/>, document.getElementById('react-root'))
