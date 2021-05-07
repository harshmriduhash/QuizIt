# Styling Quizit Phase

### Preview of skeleton:
![skeleton-grid-preview](./readme/skeleton-grid-preview.png "skeleton-grid-preview.png")

Components begin rendering in Home.js line 182.
```javascript
  // Renders left div. You can render a specific component and pass props like so.
  renderLeft = ()=>{
    if(this.state.loggedIn){
      return(<CurrentQuestions questions={this.state.questions} />)
    }
  }

  // Renders right div. You can render a specific component and pass props like so.
  renderRight = ()=>{
    if(this.state.loggedIn){
      return(<Chatroom user={this.state.user} />)
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row pushDown"></div>
        <div className="row">
          <div className="col col-sm-3 col-lg-2 quizitLeft">
            {this.renderLeft()}
          </div>
          <div className="col col-sm-6 col-lg-8 quizitCenter">
              <div className = "quizitPlayground vh-center">
                <div className="quizitPlaygroundTop">{this.renderStuff()}</div>
                <div className="quizitPlaygroundBottom">{this.renderTimer()}</div>
              </div>
          </div>
          <div className="col col-sm-3 col-lg-2 quizitRight">
            {this.renderRight()}
          </div>
        </div>
      </div>
    );
  }
```

You can remove borders and start styling in Home.css and the appropriate .css file for each component.

In Home.css, you can remove borders by commenting out or removing this:
```css
.quizitLeft, .quizitRight, .quizitCenter, 
.quizitPlayground, .quizitPlaygroundTop, .quizitPlaygroundBottom{
	border: solid black 1px;
}
```

Important to note in Home.css is the following:
```css
.pushDown{
	height: 50px;
}

.quizitLeft, .quizitRight, .quizitCenter{
	height: calc(100vh - 50px);
}

.quizitPlayground{
	width: 80%;
	margin: auto;
	height: 90%;
}

.vh-center{
    position: absolute;
    top:50%;
    left: 50%;
    transform:translateX(-50%) translateY(-50%);
    -webkit-transform:translateX(-50%) translateY(-50%);
}
```
In order to get vertical and horizontal align to work with this method, the navbar is now fixed to the top of the screen. Class pushDown pushes everything down so the navbar doesn't cover content and calc will calculate the height of the columns to fill your screen and exactly your screen.

### Troubleshooting
If you run into issues with react compiling and importing after git pull origin master, it likely did not change a file name. Sometimes git fails to change a renamed file name. Here is an example error you might run into.
![css-compile-error](./readme/css-compile-error.png "css-compile-error")

Simply change the name of the file to match the name of the import in Home.js and restart yarn start.
![css-compile-solution](./readme/css-compile-solution.png "css-compile-solution")
![css-compile-solution-2](./readme/css-compile-solution-2.png "css-compile-solution-2")