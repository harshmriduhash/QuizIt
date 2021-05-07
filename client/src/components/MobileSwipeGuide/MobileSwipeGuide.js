import React, {Component} from "react";
import "./MobileSwipeGuide.css";

class MobileSwipeGuide extends Component {

  render(){
    return(
      <div className="mobile-swipeGuide">
        {this.props.left.show?<span className="mobile-swipeGuide-left animated infinite pulse"><i className="align-right fas fa-angle-double-left"></i> {this.props.left.text}</span>:null}
        {this.props.right.show?<span className="mobile-swipeGuide-right animated infinite pulse">{this.props.right.text} <i className="align-right fas fa-angle-double-right"></i></span>:null}
      </div>
    )
  }
}

export default MobileSwipeGuide;