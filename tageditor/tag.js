import React from 'react';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import i18n from '../../helpers/i18n.js';
import * as Colors from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import { Emboss } from '../../appsettings.json';
import AlertComponent from '../../components/alertcomponent.jsx';
const Tag = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState: function () {
        return { open: false }
    },
    handleDeleteClick: function () {
        this.props.onRemoveClick();
        this.setOpen(false);
    },
    handleRequestClose: function () {
        if (this.props.alertOnRemove) {
            this.setOpen(true);
            return;
        }
        this.props.onRemoveClick();
    },
    handleOpen: function () {
        this.setOpen(true);
    },
    handleClose: function () {
        this.setOpen(false);
    },
    setOpen: function(open){
        this.setState({ open });
    },
    handleTouchTap: function(){
        if(this.props.onTagTouch){
            this.props.onTagTouch(this.props.item);
        }
    },
    render: function () {
        const actions = [
            <FlatButton
                label={i18n.t("No") }
                secondary={true}
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                label={i18n.t("Yes") }
                primary={true}
                onTouchTap={this.handleDeleteClick}
                />,
        ];
        return (<div
            style={{
                marginRight: '1%',
                marginTop: '1%'
            }}>
            <Chip
                style={{ backgroundColor: this.props.tagBackgroundColor || Colors.cyan500 }}
                labelColor="white"
                onTouchTap={this.handleTouchTap}
                onRequestDelete={this.props.readOnly ? null : this.handleRequestClose }
                >
                {this.props.item.props && this.props.item.props.avatar}
                {this.props.item}
            </Chip>
            <Dialog
                title={i18n.t("Warning") }
                actions={actions}
                modal={true}
                open={this.state.open}
                >
                <div style={{ textAlign: 'center' }}><h3>{i18n.t("This tag value will be deleted permanently! Do you want to continue?") }</h3></div>
            </Dialog>
        </div>);
    }
});

export default Tag;