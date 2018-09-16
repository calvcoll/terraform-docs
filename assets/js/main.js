class Root extends React.Component {
  constructor() {
    super()
    this.sortInputs = this.sortInputs.bind(this);
  }

  componentDidMount() {
    this.setState({});
    $.getJSON('/api', (data) => {
      this.setState({tf: data})
    });
  }

  renderComment() {
    if (this.state.tf.Comment || this.state.tf.Comment !== "") {
      return (
        <div id="comment">
          <h2 className="title">Comment</h2>
          <code>
            {this.state.tf.Comment.split('\n').map((line, index) => {
              return (
                <React.Fragment key={line + ` ${index}`}>
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
          <h5>{`${entry[0]}: `}</h5>
          {`${entry[1]}`}
        </div>
      ) : (<React.Fragment key={entry[0]}/>);
    } else if (entry[0] === "Default") {
      let default_obj = entry[1];
      return default_obj !== null ? (
        <div className="variable-entry" key={entry[0]}>
          <h5>Default:</h5>
          <i>Type: </i>{`${default_obj.Type}`}<br/>
          <i>Value: </i><code>{`"${default_obj.Literal}"`}</code>
        </div>
      ) : (<React.Fragment key={entry[0]}/>);
    } else {
      return (
        <div className="variable-entry" key={entry[0]}>
          <h5>{`${entry[0]}: `}</h5>
          {`${entry[1]}`}
        </div>
      );
    }
  }

  sortInputs(a,b) {
    if ((a.Default !== null && b.Default !== null)) {
      return a.Name.localeCompare(b.Name);
    } else if (a.Default !== null) {
      return +1;
    } else if (b.Default !== null) {
      return -1;
    } else {
      return a.Name.localeCompare(b.Name);
    }
  }

  renderInputs() {
    if (this.state.tf.Inputs) {
      return (
        <div id="columns inputs">
          <h2 className="title">Inputs</h2>
          {
            this.state.tf.Inputs.sort(this.sortInputs).map((input) => {
              const isRequired = input.Default === null;
              return (
                <div className="panel variable" key={input.Name}>
                  <p className="panel-heading">
                    {
                      isRequired? (
                        <span className="icon has-text-warning">
                          <i className="fas fa-exclamation-triangle"></i>
                        </span>
                      ): (<React.Fragment/>)
                    }
                  {input.Name}
                  </p>
                  <div className="panel-block block_text content">
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
            <div className="panel output" key={output.Name}>
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
        <React.Fragment key="root_fragment">
          <div className="section">{this.renderComment()}</div>
          <div className="section">{this.renderInputs()}</div>
          <div className="section">{this.renderOutputs()}</div>
        </React.Fragment>
      )
    }
  }
}

ReactDOM.render(<Root/>, document.getElementById('react-root'))
