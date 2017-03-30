import React from 'react';
import connect from 'reflux/src/connect';
import Immutable from 'immutable';
import _ from 'lodash';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover/Popover';
const AutoCompleteMenu = React.createClass({
    mixins: [PureRenderMixin],
    defaultOptions: {
        anchorOrigin: { "horizontal": "left", "vertical": "bottom" },
        targetOrigin: { "horizontal": "left", "vertical": "top" },
        zDepth: 2
    },
    getMenuItems: function () {
        return this.props.filterList.map((value) => {
            return <MenuItem key={value} primaryText={value}  />
        }).toArray();
    },
    render: function () {
        return (
            <Popover open={this.props.open}
                anchorEl={this.props.anchorEl}
                onRequestClose={this.props.onRequestClose}
                className="autoCompleteMenu">
                <Menu maxHeight={100}
                    onItemTouchTap={this.props.onItemTouchTap }
                    autoWidth={true}
                    desktop={true}>
                    {this.getMenuItems() }
                </Menu>
            </Popover>
        );
    }
});

export default AutoCompleteMenu;