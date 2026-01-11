export const RoutesPaths = {
  home: '/',
  newApplication: '/new-application',
  applicationDetail: '/applications/:id',
} as const;

export const getApplicationDetailPath = (id: string) => `/applications/${id}`;
