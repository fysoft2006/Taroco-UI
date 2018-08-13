let baseUrl = '';
let turbine_prefix = '';
let iconfontVersion = ['567566_r22zi6t8noas8aor', '599693_0b5sleso3f1j1yvi', '667895_xte3dcfrvbo6r'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;

if (process.env.NODE_ENV == 'development') {
  baseUrl = `http://111.231.192.110:10000`;
  turbine_prefix = `http://111.231.192.110:10002/`;
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = `http://111.231.192.110:10000`;
  turbine_prefix = `http://111.231.192.110:10002/`;
}
let codeUrl = baseUrl + `/admin/code`;
// taroco:taroco Base64 编码
let clientSec = 'dGFyb2NvOnRhcm9jbw==';
export {
  baseUrl,
  turbine_prefix,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  clientSec
}
