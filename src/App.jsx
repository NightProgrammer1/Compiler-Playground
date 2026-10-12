import { useState } from 'react';

export default function App() {
  const [code, setCode] = useState('// Write your C code here\nint main() {\n    return 42;\n}');
  const [activeTab, setActiveTab] = useState('assembly');
  const [output, setOutput] = useState({
    assembly: '; Generated x86-64 assembly will appear here after compiling',
    ast: '// AST tree structure will appear here',
    ir: '// Intermediate Representation will appear here'
  });

  const handleCompile = () => {
    setOutput({
      assembly: `.global main\nmain:\n    movq $42, %rax\n    ret`,
      ast: `TranslationUnit\n└── FunctionDecl (main)\n    └── CompoundStmt\n        └── ReturnStmt\n            └── IntegerLiteral (42)`,
      ir: `function main() {\n    _t1 = 42\n    return _t1\n}`
    });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: '#1e1e1e', color: '#fff' }}>
      
      {/* Left Pane: Code Editor */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #333' }}>
        <div style={{ padding: '12px 16px', background: '#252526', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>C Source Code</span>
          <button 
            onClick={handleCompile}
            style={{ background: '#0e639c', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
          >
            Compile & Run
          </button>
        </div>
        <div style={{ flexGrow: 1, display: 'flex' }}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            style={{
              width: '100%',
              height: '100%',
              background: '#1e1e1e',
              color: '#d4d4d4',
              border: 'none',
              padding: '16px',
              fontFamily: 'Consolas, "Courier New", monospace',
              fontSize: '14px',
              lineHeight: '1.5',
              resize: 'none',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Right Pane: Output Tabs */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', background: '#1e1e1e' }}>
        <div style={{ display: 'flex', background: '#2d2d2d', borderBottom: '1px solid #333' }}>
          {['assembly', 'ast', 'ir'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                background: activeTab === tab ? '#1e1e1e' : 'transparent',
                color: activeTab === tab ? '#fff' : '#888',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #0e639c' : 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={{ flexGrow: 1, padding: '16px', overflowY: 'auto' }}>
          <pre style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '13px', color: '#9cdcfe', whiteSpace: 'pre-wrap' }}>
            {output[activeTab]}
          </pre>
        </div>
      </div>

    </div>
  );
}