import BraftEditor from 'braft-editor';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
/**
 * prismjs语言列表
 */
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-glsl';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-yaml';

BraftEditor.use(
  CodeHighlighter({
    syntaxs: [
      {
        name: 'JavaScript',
        syntax: 'javascript',
      },
      {
        name: 'TypeScript',
        syntax: 'typescript',
      },
      {
        name: 'HTML',
        syntax: 'html',
      },
      {
        name: 'CSS',
        syntax: 'css',
      },
      {
        name: 'Bash',
        syntax: 'bash',
      },
      {
        name: 'JSX',
        syntax: 'jsx',
      },
      {
        name: 'TSX',
        syntax: 'tsx',
      },
      {
        name: 'Dockerfile',
        syntax: 'docker',
      },
      {
        name: 'GLSL',
        syntax: 'glsl',
      },
      {
        name: 'Markdown',
        syntax: 'markdown',
      },
      {
        name: 'Nginx',
        syntax: 'nginx',
      },
      {
        name: 'Python',
        syntax: 'python',
      },
      {
        name: 'YAML',
        syntax: 'yaml',
      },
    ],
    showLineNumber: true,
  })
);
