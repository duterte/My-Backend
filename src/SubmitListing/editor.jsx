import { useState, useRef } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function TextEditor({ meta }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editor = useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  function onChange(editorState) {
    setEditorState(() => editorState);
    const value = convertToRaw(editorState.getCurrentContent());
    meta.dispatch({ payload: { name: 'jsRaw', value } });
  }

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }

  function mapKeyToEditorCommand(e) {
    // keyCode 9 === TAB key
    if (e.keyCode === 9) {
      const newState = RichUtils.onTab(e, editorState, 4);
      if (newState !== editorState) {
        onChange(newState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  function tools(type, style) {
    if (type === 'inline') {
      onChange(RichUtils.toggleInlineStyle(editorState, style));
    } else {
      onChange(RichUtils.toggleBlockType(editorState, style));
    }
  }

  let className = 'editor';
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' editor-placeholder';
    }
  }

  return (
    <div className="text-holder" onClick={focusEditor}>
      <div className="tools">
        <BlockTools editorState={editorState} toggle={tools} />
        <InlineTools editorState={editorState} toggle={tools} />
      </div>

      <div className={className}>
        <Editor
          placeholder="Write Description"
          spellCheck={true}
          editorState={editorState}
          customStyleMap={STYLE_MAP}
          ref={editor}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          blockStyleFn={getBlockStyle}
        />
      </div>
    </div>
  );
}

const STYLE_MAP = {
  CODE: {
    fontFamily: 'monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'blockquote';
    case 'header-one':
      return 'header-one';
    default:
      return null;
  }
}

function Control(props) {
  const { style, active, label, onToggle, btnStyle = '', type } = props;

  function toggle(e) {
    e.preventDefault();
    onToggle(type, style);
  }

  let className = `${btnStyle} inactive-button`;
  if (active) {
    className += ' active-button';
  }

  return (
    <span className={className} onMouseDown={toggle}>
      {label}
    </span>
  );
}

const BLOCK_TOOLS = [
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'UL', style: 'unordered-list-item' },
];

function BlockTools(props) {
  const { editorState, toggle } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return BLOCK_TOOLS.map(({ label, style, group }) => (
    <Control
      key={label}
      active={style === blockType}
      label={label}
      onToggle={toggle}
      style={style}
      group={group}
      type="block"
    />
  ));
}

const INLINE_TOOLS = [
  { label: 'B', style: 'BOLD' },
  { label: 'I', style: 'ITALIC', btnStyle: 'italic' },
  { label: 'U', style: 'UNDERLINE', btnStyle: 'underline' },
];

function InlineTools(props) {
  const { toggle } = props;
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return INLINE_TOOLS.map(({ label, style, btnStyle }) => (
    <Control
      key={label}
      active={currentStyle.has(style)}
      label={label}
      onToggle={toggle}
      style={style}
      type="inline"
      btnStyle={btnStyle}
    />
  ));
}
