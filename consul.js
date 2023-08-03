const Consul = require('consul');

const consul = Consul(
    {
        defaults: {
            token: process.env.CONSUL_TOKEN
        },
        host: process.env.CONSUL_HOST,
        port: process.env.CONSUL_PORT,
        promisify: true,
        secure: true,
    }
);

const search = async () => {
    const tenantKeys = await consul.kv.keys('private/shiva/activity/activities')

    await tenantKeys.forEach(async (key) => {
        try {
            await consul.kv.get({ recursive: false, key }).then(() => {
            }).catch((err) => {
                console.log(`prefix: ${key}.`)
                console.log(err)
            })
        } catch (err) {
            console.log(err)
        }
    });
}

search();
