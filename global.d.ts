declare module '*.scss' {
  const style: {
    [key: string]: string;
  };
  export default style;
}

declare module '*.jpg' {
  const path: string;
  export default path;
}

declare module 'braft-extensions/dist/code-highlighter' {
  interface Option {
    syntaxs?: { name: string; syntax: string }[];
    showLineNumber?: boolean;
  }
  const CodeHighLighter: (option?: Option) => any;
  export default CodeHighLighter;
}

declare module 'prismjs/*';

declare module 'cos-js-sdk-v5' {
  declare const COS: any;
  export default COS;
}

interface Window {
  Prism: any;
}
