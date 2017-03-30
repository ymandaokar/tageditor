import React from 'react';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import ReactDOM from 'react-dom';
import connect from 'reflux/src/connect';
import Immutable from 'immutable';
import _ from 'lodash';
import Tag from './tag.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import i18n from '../../helpers/i18n.js';
import AutoCompleteMenu from './autocompletemenu.js';
const TagEditor = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        dataSource: React.PropTypes.func,
        tags: React.PropTypes.array,
        delimiters: React.PropTypes.objectOf(RegExp)
    },
    getInitialState: function () {
        return {
            value: this.props.value || "",
            dataSource: this.props.dataSource ?
                this.props.dataSource()
                : [],
            tags: Immutable.Set(this.props.tags || [])
        }
    },
    componentWillReceiveProps: function () {
        this.setState({
            dataSource: this.props.dataSource ?
                this.props.dataSource()
                : [],
            tags: this.props.setByTagsOnly ? Immutable.Set(this.props.tags || []) : this.state.tags
        });
    },
    componentDidUpdate: function () {
        if (this.props.setByTagsOnly && !(Immutable.Set(this.props.tags).equals(this.state.tags))) {
            this.setState({
                tags: Immutable.Set(this.props.tags)
            });
        }
    },
    componentDidMount: function () {
        this.anchorEl = ReactDOM.findDOMNode(this.refs.textField);
    },
    getFilterList: function () {
        let filterList = Immutable.Set(),
            tags = this.state.tags;
        if (this.state.value) {
            filterList = _.filter(this.state.dataSource, (data) => {
                if (_.startsWith(_.toLower(data), _.toLower(this.state.value))
                    && (!tags.get(data))) {
                    return true;
                }
            });
        }
        return Immutable.Set(filterList);
    },
    emitOnTagChange: function (tagName, tags, action, value) {
        this.setState({ tags, value }, () => this.props.onTagChange(tagName, this.state.tags, action));
    },
    addTag: function () {
        let value = _.trim(this.state.value),
            tags = this.state.tags;
        if (value) {
            tags = tags.add(value)
        }
        this.emitOnTagChange(value, tags, "add", "");
    },
    removeTag: function (tagName) {
        this.emitOnTagChange(tagName, this.state.tags.remove(tagName), "remove", this.state.value);
    },
    handleItemTouchTap: function (event, menuItem, index) {
        this.emitOnTagChange(menuItem.key, this.state.tags.add(menuItem.key), "add", "");
    },
    handleChange: function (event, value) {
        if (this.props.delimiters.test(value)) {
            value = "";
        }
        this.setState({ value }, this.refs.textField.focus.bind(this.refs.textField));
    },
    handleOnKeyDown: function (event) {
        if (event.keyCode == 13 || this.props.delimiters.test(event.key)) {
            this.addTag();
        }
    },
    handleRequestClose: function () {
        this.refs.textField.focus();
    },
    render: function () {
        const filterList = this.getFilterList(),
            open = !!(filterList.size && this.state.value);
        return (<div>
            <div className="col-xs-12">
                <div className="row">
                    {   this.state.tags.map((item, i) =>
                        <Tag
                            key={item.props ? item.props.value : item}
                            readOnly={this.props.readOnly}
                            item={item}
                            onRemoveClick={this.removeTag.bind(this, item) }
                            {...this.props}
                            />)
                    }
                </div>
            </div>
            {this.props.hideTextField ? null : <div className="row">
                <div className="col-xs-12">
                    <div className="box">
                        <AutoCompleteMenu
                            filterList={filterList }
                            onItemTouchTap = {this.handleItemTouchTap}
                            onRequestClose={this.handleRequestClose}
                            anchorEl={this.anchorEl}
                            open={open}
                            />
                        <TextField
                            id={this.props.id}
                            key={`tag_${this.props.id}`}
                            hintText={this.props.hintText}
                            onChange={this.handleChange}
                            onKeyDown={this.handleOnKeyDown}
                            fullWidth={true}
                            ref="textField"
                            value={this.state.value}
                            />
                    </div>
                </div>
            </div>}
        </div>);
    }
});

export default TagEditor;
