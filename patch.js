const fs = require('fs');
const file = '/Users/mdfaizan/Downloads/diamondexchange backup/front/v93/static/front/css/style.css';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/--primary-color:\s*#[0-9a-fA-F]+;/, '--primary-color: #000000;');
content = content.replace(/--primary-dark:\s*#[0-9a-fA-F]+;/, '--primary-dark: #212529;');
content = content.replace(/--primary-light:\s*#[0-9a-fA-F]+;/, '--primary-light: #7F00FF;');
content = content.replace(/--background-color:\s*#[0-9a-fA-F]+;/, '--background-color: #f1f1f1;');
content = content.replace(/--bg-primary65:\s*rgba\([^)]+\);/, '--bg-primary65: rgba(0, 0, 0, 0.65);');
content = content.replace(/--bg-primary90:\s*rgba\([^)]+\);/, '--bg-primary90: rgba(0, 0, 0, 0.9);');
content = content.replace(/--bg-secondary70:\s*rgba\([^)]+\);/, '--bg-secondary70: rgba(33, 37, 41, 0.7);');
content = content.replace(/--bg-secondary85:\s*rgba\([^)]+\);/, '--bg-secondary85: rgba(33, 37, 41, 0.85);');
content = content.replace(/--text-sidebar:\s*#[0-9a-fA-F]+;/, '--text-sidebar: #000000;');
content = content.replace(/--text-body:\s*#[0-9a-fA-F]+;/, '--text-body: #000000;');
content = content.replace(/--input-border:\s*#[0-9a-fA-F]+;/, '--input-border: #cccccc;');
content = content.replace(/--sidebar-menu-link-bg:\s*#[0-9a-fA-F]+;/, '--sidebar-menu-link-bg: #e9ecef;');
content = content.replace(/--sidebar-menu-link-color:\s*#[0-9a-fA-F]+;/, '--sidebar-menu-link-color: #000000;');
content = content.replace(/--table-border:\s*#[0-9a-fA-F]+;/, '--table-border: #cccccc;');
content = content.replace(/--bg-table:\s*#[0-9a-fA-F]+;/, '--bg-table: #ffffff;');
content = content.replace(/--bg-table-row:\s*#[0-9a-fA-F]+;/, '--bg-table-row: #f8f9fa;');

fs.writeFileSync(file, content);
console.log('patched');
