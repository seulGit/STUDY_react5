import { Component } from "react";

class UpdateContent extends Component {
    //value값에 바로 this.props.data.title을 넣으면 props는 read-only값이라 값을 변경하지 못하므로 생성자로
    //props를 state로 받아서 value를 state값으로서 바꿀수 있게 해준다.
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            title: this.props.data.title,
            desc: this.props.data.desc
        }
        //공통으로 사용되는 bind(this)를 넣은 값을 변수로 빼준다.
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e) {
        // [e.target.name]으로 title과 desc값을 각각 변경할 수 있다.
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        console.log(this.props.data);
        console.log('UpdateContent render')
        return (
            <article>
                <h2>Update</h2>
                <form action="/update_process" method="post"
                onSubmit={function(e) {
                    e.preventDefault();
                    this.props.onSubmit(
                        this.state.id,
                        this.state.title,
                        this.state.desc
                    );
                }.bind(this)}>
                    {/* id값을 가져오는 코드 추가 */}
                    <input type="hidden" name="id" value={this.state.id}></input>
                    <p>
                        <input type="text" name="title" placeholder="title" value={this.state.title}
                                onChange={this.inputFormHandler}></input>
                    </p>
                    <p>
                        <textarea name="desc" placeholder="description" value={this.state.desc}
                                    onChange={this.inputFormHandler}></textarea>
                    </p>
                    <p>
                        <input type="submit"></input>
                    </p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;