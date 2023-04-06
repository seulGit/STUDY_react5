import logo from './logo.svg';
import './App.css';
import TOC from "./components/TOC";
import Content from './components/Content'
import Subject from './components/Subject'
import CreateContent from './components/CreateContent';
import Control from './components/Control';
import UpdateContent from './components/UpdateContent';
import { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    //contents의 마지막 id값을 변수로 지정
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      // 기본으로 지정하는 id값
      selected_content_id: 1,
      welcome: {title:'Welcome', desc:'Hello, React!'},
      subject: {title:'WEB', sub: 'Wrold Wide Web'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is HyperText Markup Language'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interative'},
      ]
    }
  }


    getReadContent() {
      //while을 이용한 id값 통제
      var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
    }

    getContent() {
      //컨텐츠 영역에 표시할 _article도 정의해준다 
      var _title, _desc, _article = null;
      if(this.state.mode === 'welcome') {
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _article = <Content title={_title} desc={_desc}></Content>
      } else if(this.state.mode === 'read') {
        var _content = this.getReadContent();
        _article = <Content id={_content.id} title={_content.title} desc={_content.desc}></Content>
      } else if(this.state.mode === 'create') {
        _article = <CreateContent onSubmit={function(_title, _desc) {
          //add content to this.state.contents
          this.max_content_id = this.max_content_id + 1;
          //push()를 사용한 원본배열변경은 권장하지않음
          //this.state.contents.push(
          //  { id: this.max_content_id, title: _title, desc: _desc });
          // var _contents = this.state.contents.concat(
          //  { id: this.max_content_id, title: _title, desc: _desc }
          //  )
          var _contents = Array.from(this.state.contents)
          _contents.push({id:this.max_content_id, title:_title, desc:_desc})
            this.setState({
              contents: _contents,
              mode: 'read',
              selected_content_id: this.max_content_id
            })
            console.log(_title, _desc);
          }.bind(this)}></CreateContent>
        } else if(this.state.mode === 'update') {
          _content = this.getReadContent();
          _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc) {
            //push()를 사용한 원본배열변경은 권장하지않음
            //this.state.contents.push(
            //  { id: this.max_content_id, title: _title, desc: _desc });
            // var _contents = this.state.contents.concat(
            //  { id: this.max_content_id, title: _title, desc: _desc }
            //  )
            // 업데이트할 컨텐츠의 id값을 이용해서 해당id를 가진 컨텐츠를 배열에서 업데이트
            var _contents = Array.from(this.state.contents)
            var i = 0;
            while(i < _contents.length) {
              if(_contents[i].id === _id) {
                _contents[i] = {id: _id, title: _title, desc: _desc};
                break;
              }
              i = i + 1;
            }
              this.setState({
                contents: _contents,
                mode: 'read'
              })
            }.bind(this)}></UpdateContent>
        }
        return _article;
  }

  
  render() {
    console.log('App render');
  
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}
                onChangePage={ function() {
                  this.setState({
                    mode: 'welcome'
                  })
                }.bind(this)}>
        </Subject>
        <TOC onChangePage={function(id) {
          this.setState({
            //기본 mode는 read로 해두고, string형식인 id값을 숫자형식으로 변경해준다.
            mode: 'read', 
            selected_content_id: Number(id)
          })
        }.bind(this)} data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode) {
                if(_mode === 'delete') {
                  //confirm은 앞에 window를 붙여줘야 실행된다
                  if(window.confirm('Really?')) {
                    //원본 배열을 직접 수정하지 않게하기
                    var _contents = Array.from(this.state.contents);
                    var i = 0;
                    while(i < _contents.length) {
                      if(_contents[i].id === this.state.selected_content_id) {
                        //splice()로 어디에서 어디까지 지울 것인지 결정 
                        _contents.splice(i,1);
                        break;
                      }
                      i = i + 1;
                    }
                    this.setState({
                      mode: 'welcome',
                      contents: _contents
                    });
                    alert('Deleted!');
                  }
                } else {
                  this.setState({
                    mode: _mode
                  });
                }
              }.bind(this)}>
        </Control>
        {/* 컨텐츠 영역에 표시할 내용을 변수로 지정 */}
        {this.getContent()}
      </div>
    );
  }
}

export default App;
