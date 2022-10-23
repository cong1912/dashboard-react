import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_END_POINT;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
