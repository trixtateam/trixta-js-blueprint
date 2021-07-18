import * as React from 'react';

interface Props {
  data: any;
}

export const JsonViewer = (props: Props) => (
  <div>
    <pre
      style={{
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >{JSON.stringify(props.data, null, 2)}</pre>
  </div>
);
