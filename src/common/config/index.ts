const config = {
  database: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tradops'
  },
  git: {
    url: 'https://api.github.com/',
    org: 'Hotmart-Org',
    token: '0097209b7c933c752c552c8d04d09eca9d032dac',
    branch: 'master',
    label: 'TRANSLATE'
  },
  transifex: {
    url: 'https://www.transifex.com/api/2',
    urlRest: 'https://rest.api.transifex.com',
    urlMedia: 'https://usermedia.transifex.com/',
    organizationSlug: 'hotmart',
    token: '1/c3fe5d0d094e496f85f39e0a65df64a51912ee8c',
    username: 'api'
  },
  aws: {
    s3: {
      endpoint: 'http://127.0.0.1:9000',
      bucket: 'tradops'
    },
    credentials: {
      accessKeyId: 'DFNLPLIFN27UU7B1AX2T',
      secretAccessKey: 'OD8JptM4pT7LrlAVg7RMoDL729c8kj+zghIZfG9C'
    }
  }
};

export default config;
