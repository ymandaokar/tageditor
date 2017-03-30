# tageditor using material-ui

_Note: if you are using material-ui then this tageditor is available for you._

example
```js
<TagEditor
     tags={stringArray}
     setByTagsOnly={true}
     onTagTouch={this.handleTagTouch}
     tagBackgroundColor={Colors.blueGrey300}
     onTagChange={this.handleTagChange}
     alertOnRemove={true}
     hideTextField={true}
/>
```
# demo image
![demo image](https://imagebin.ca/v/3HLBrfwdjYE3)

# Properties:

property | type | description
----------------- | ----------------- | ---------------------------------------
tags | array | array of strings or component which you want to show in tag
setByTagsOnly | boolean | whether you want to set only by tags or you want to add some tags itsef too.
onTagTouch | function | callback function(item) where item is component of each tag
tagBackgroundColor | html/material-ui color | background color
onTagChange | function | callback function(tagName, tags, action)
alertOnRemove | boolean | whether you want show alert message or not.
hideTextField | boolean | whether to show tageditor textfeild to add more tags or not
readOnly | boolean | whether tags are read only or can have remove facility

_creator - **Yogesh Manohar Mandaokar**(Software Developer)_
