// pro cfg

const env = {
    DEV: {
        API: 'http://localhost:7801',
    },
    PROD: {
        API: 'https://api.teidepermit.eu',
    },
};


let cfg;
if (process.env.NODE_ENV === 'development') {
    cfg = env.DEV;
} else if (process.env.NODE_ENV === 'production') {
    cfg = env.PROD;
} else if (process.env.NODE_ENV === 'frontend') {
    cfg = env.PROD;
}else{
    cfg = env.DEV;
}

export const config = cfg;
console.log('env', {env: process.env.NODE_ENV, config});
