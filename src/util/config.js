let baseURL = '';
let turbine_prefix = '';
if (process.env.NODE_ENV == 'development') {
  baseURL = `http://127.0.0.1:10000/`;
  turbine_prefix = `http://127.0.0.1:10002/`;
} else if (process.env.NODE_ENV == 'production') {
  baseURL = `http://111.231.192.110:10000/`;
  turbine_prefix = `http://127.0.0.1:10002/`;
}


const config = {
  baseURL: baseURL,
  turbine_prefix: turbine_prefix,
  codeUrl: baseURL + "admin/code"
}

export {
  config
}
