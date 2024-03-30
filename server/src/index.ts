import('tsconfig-paths')
    .then(({ register }) => {
        register({
            baseUrl: __dirname,
            paths: { '@/*': ['*'] },
            addMatchAll: false,
        });
    })
    .then(() => import('dotenv'))
    .then(({ config }) => config())
    .then(() => import('@/app'))
    .then(({ listen }) => listen())
    .then(() => import('@/database'))
    .then(({ connect }) => connect())
    .catch((err) => {
        console.error(err);
        if (process.env.NODE_ENV === 'production') {
            process.kill(process.pid, 'SIGTERM');
        }
    });