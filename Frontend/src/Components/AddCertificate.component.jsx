import React, { Component } from 'react';
class AddCertificate extends Component {
render() {
const { value , onChangeValue } = this.props;
return (
  <div>
    <input type="text"  value={value} onChange={onChangeValue}/> 
  </div>
);
}
}
export default AddCertificate;