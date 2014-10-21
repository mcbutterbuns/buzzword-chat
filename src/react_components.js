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
        <li className="log">
          <span className="timestamp">{moment(log.timestamp).format('HH:mm A')}</span>
          <span className="from">{log.from}:</span>
          <span className="text">{log.msg}</span>
        </li>
      );
    })

    return (
      <ol id="chatroom" className="list-unstyled">{items}</ol>
    );
  }
}));
