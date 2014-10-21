/** @jsx React.DOM */

app.directive( 'chatroom', function( reactDirective ) {
  return reactDirective( 'ChatroomComponent' );
} );

app.value('ChatroomComponent', React.createClass({
  propTypes:{
    logs: React.PropTypes.array
  },
  render: function(){
    var items = this.props.logs.map(function(log){
      return (
        React.DOM.li({className: "log"}, 
          React.DOM.span({className: "timestamp"}, moment(log.timestamp).format('HH:mm A')), 
          React.DOM.span({className: "from"}, log.from, ":"), 
          React.DOM.span({className: "text"}, log.msg)
        )
      );
    })

    return (
      React.DOM.ol({id: "chatroom", className: "list-unstyled"}, items)
    );
  }
}));
