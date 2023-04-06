import { Component } from "react";

class TOC extends Component {

  shouldComponentUpdate(newProps, newState) {
    console.log('==========> TOC render shouldComponentUpdate'
                ,newProps.data
                ,this.props.data);
    if(this.props.date === newProps.data) {
      return false;
    }
    return true;
  }

  render() {
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length) {
          lists.push(<li key={data[i].id}>
            <a href={"/content/"+data[i].id}
              onClick={function(id, e) {
                e.preventDefault();
                //이벤트의 target속성은 a링크를 가리키고, target속성 안의 dataset 속성에는 id값이 있다. 
                //id값을 가져오도록 하는 코드 작성
                this.props.onChangePage(id);
              }.bind(this, data[i].id)}>{data[i].title}</a></li>)
          i = i+1;
      }
    return (
      <nav>
          <ul>
              {lists}
          </ul>
      </nav>
    )
  }
}


export default TOC;