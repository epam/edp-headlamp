import Editor from '@monaco-editor/react';
import * as yaml from 'js-yaml';
import React from 'react';

export const ViewYAML = ({ item }: { item: object }) => {
  return (
    <Editor
      language={'yaml'}
      theme={'light'}
      value={yaml.dump(item)}
      options={{
        selectOnLineNumbers: true,
        readOnly: true,
      }}
      onChange={undefined}
      height="600px"
    />
  );
};
