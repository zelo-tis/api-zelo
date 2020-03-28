import axios from 'axios';
import CONFIG from '../config';
import {
  ScreenshotUpload,
  ScreenshotMapping
} from '../interfaces/transifex/screenshot.interface';
import { ServiceConnectionError } from '../utils/errors';

export default class Transifex {
  private static getHeaderRest() {
    return {
      headers: {
        Authorization: `Bearer ${CONFIG.transifex.token}`
      }
    };
  }

  private static getHeader() {
    return {
      auth: {
        username: CONFIG.transifex.username,
        password: CONFIG.transifex.token
      }
    };
  }

  public static getProjectLanguages(projectSlug: string) {
    const url = `${CONFIG.transifex.urlRest}/projects/o%3A${CONFIG.transifex.organizationSlug}%3Ap%3A${projectSlug}/languages`;
    return axios.get(url, Transifex.getHeaderRest());
  }

  public static getProjectLanguagesUsers(projectSlug: string) {
    const url = `${CONFIG.transifex.url}/project/${projectSlug}/languages`;
    return axios.get(url, Transifex.getHeader());
  }

  public static getProjectStats(projectSlug: string, resourceSlug: string) {
    const url = `${CONFIG.transifex.url}/project/${projectSlug}/resource/${resourceSlug}/stats/`;
    return axios.get(url, Transifex.getHeader());
  }

  public static getStringsPeriod(
    projectSlug: string,
    resourceSlug: string,
    resource: string = 'pt_BR',
    sourceUpdateFrom: string,
    sourceUpdateTo: string
  ) {
    const url = `${CONFIG.transifex.url}/project/${projectSlug}/resource/${resourceSlug}/translation/${resource}/strings/?source_update_from=${sourceUpdateFrom}&source_update_to=${sourceUpdateTo}`;
    return axios.get(url, Transifex.getHeader());
  }

  public static getProjectKeys(
    projectSlug: string,
    resourceSlug: string,
    language: string = 'pt_BR',
    status: boolean = false
  ) {
    const url = `${CONFIG.transifex.urlRest}/resource_translations?filter[resource]=o%3A${CONFIG.transifex.organizationSlug}%3Ap%3A${projectSlug}%3Ar%3A${resourceSlug}&filter[language]=l%3A${language}&filter[translated]=${status}&include=resource_string`;
    return axios.get(url, Transifex.getHeaderRest());
  }

  public static getTransifexProjects() {
    const url = `${CONFIG.transifex.url}/projects`;
    return axios.get(url, Transifex.getHeader());
  }

  public static getTransifexProjectDetails(project_slug: string) {
    const url = `${CONFIG.transifex.url}/project/${project_slug}/?details`;
    return axios.get(url, Transifex.getHeader());
  }

  public static uploadScreenshot(
    project_slug: string,
    screenshot: ScreenshotUpload
  ) {
    const url = `${CONFIG.transifex.urlMedia}organizations/${CONFIG.transifex.organizationSlug}/projects/${project_slug}/context/screenshots`;
    return axios
      .post(url, screenshot, Transifex.getHeader())
      .then((response) => response.data)
      .catch((error) => {
        throw new ServiceConnectionError('', error);
      });
  }

  public static mappingStringsToScreenshot(
    projectSlug: string,
    screenshotId: number,
    mapping: ScreenshotMapping[]
  ) {
    const url = `${CONFIG.transifex.urlMedia}/organizations/${CONFIG.transifex.organizationSlug}/projects/${projectSlug}/context/screenshots/${screenshotId}/mapped_strings`;
    return axios
      .post(url, mapping, Transifex.getHeader())
      .then((response) => response.data)
      .catch((error) => {
        throw new ServiceConnectionError('', error);
      });
  }
}
