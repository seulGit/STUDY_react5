import { Component } from "react";

class Content extends Component {
    render() {
      return (
        <article>
          {this.props.id}
          <h2>{this.props.title}</h2>
          {this.props.desc}
        </article>
      )
    }
  }
  
  export default Content;