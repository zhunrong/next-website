declare module '*.less' {
  const style: {
    [key: string]: string;
  };
  export default style;
}

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
  }
  const CodeHighLighter: (option?: Option) => any;
  export default CodeHighLighter;
}

interface Window {
  Prism: any;
}
