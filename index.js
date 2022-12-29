const { fromFetch } = require('rxjs/fetch');
const { switchMap, of, catchError } = require('rxjs');

const urlGitlab = 'https://gitlab.com/api/v4/projects?search=pandaStudio';
const urlGithub = 'https://api.github.com/search/repositories?q=pandaStudio';

requestToApi(urlGitlab);
requestToApi(urlGithub);

function requestToApi(url) {
  const data$ = fromFetch(`${url}`).pipe(
    switchMap(response => {
      if (response.ok) {
        return response.json();
      } else {
        return of({ error: true, message: `Error ${ response.status }` });
      }
    }),
    catchError(err => {
      console.error(err);
      return of({ error: true, message: err.message })
    })
  );

  data$.subscribe({
    next: result => console.log(result),
    complete: () => console.log('done')
  });
}
