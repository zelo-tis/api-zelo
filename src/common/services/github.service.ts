import axios from 'axios';
import CONFIG from '../config';

export default class GitHub {
  private static getHeader() {
    return {
      Authorization: `token ${CONFIG.git.token}`
    };
  }

  public static createAHook(repo: string, data: object) {
    return axios.post(`${CONFIG.git.url}repos/${repo}/hooks`, data, {
      headers: GitHub.getHeader()
    }).then((response) => response.data);
  }

  public static deleteAHook(repo: string, hookId: number) {
    return axios.delete(`${CONFIG.git.url}repos/${repo}/hooks/${hookId}`, {
      headers: GitHub.getHeader()
    }).then((response) => response.data);
  }

  public static searchRepositories(q: string) {
    return axios.get(`${CONFIG.git.url}search/repositories?q=${q}+user:${CONFIG.git.org}`, {
      headers: GitHub.getHeader()
    }).then((response) => response.data);
  }

  public static getUserDetails(username: string) {
    return axios.get(`${CONFIG.git.url}users/${username}`, {
      headers: GitHub.getHeader()
    }).then((response) => response.data);
  }

  public static getPRDiff(url: string, cookies?: any) {
    return axios.get(url, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/vnd.github.VERSION.diff',
        Cookie: cookies
        // Cookie: 'user_session=yQEQ7BDOHLCo7fjrdVJ_RNZ0iFO7tvXGg2WhyJGQoOtZvOOs; __Host-user_session_same_site=yQEQ7BDOHLCo7fjrdVJ_RNZ0iFO7tvXGg2WhyJGQoOtZvOOs; has_recent_activity=1'
      }
    }).then(({ data = null }) => data);
  }
}
