import React from 'react';
import classNames from 'classnames';

class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuShow: false,
      adminSelect: '玉山國家公園'
    }
  }

  buttonClick() {
    this.setState({isMenuShow: !this.state.isMenuShow});
  }

  gg(admin) {
    return this.props.data
      .filter( hut => hut.admin === admin && hut.isApplicable )
      .map( hut => hut.nameZh)
      .sort();
  }

  onAdminClick(admin) {
    this.setState({adminSelect: admin})
  }

  onHutClick(hut) {
    this.props.onHutClick(hut);
    this.setState({isMenuShow: false})
  }

  render() {
    var menuClass = classNames({
      'menu': true,
      'menu-show': this.state.isMenuShow
    });

    var admins = ['雪霸國家公園', '玉山國家公園', '太魯閣國家公園', '台灣山林悠遊網', '南投林區管理處'];

    return (
      <div id='sidebar'>
        {admins.map( admin => {
          return (
            <div>
              <div
                className='admin'
                onClick={this.onAdminClick.bind(this, admin)}>
                <div className='hoverbar'></div>
                <div className='icon'></div>
                <div>{admin}</div>
              </div>

              <div className={classNames({
                  'hut-container': true,
                  'hut-container-show': admin === this.state.adminSelect
                })}>
                {this.gg(admin).map( hut => {
                  return (
                    <div
                      className='hut'
                      onClick={this.onHutClick.bind(this, hut)}>{hut}</div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default SideBar;
