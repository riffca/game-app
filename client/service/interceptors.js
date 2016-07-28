import token from './token';

export default function() {
    let timeId = setInterval(() => {
        logger('(http)Loading..');
    }, 10);
    return {
        request: (request) => {
            request.headers = {
                'x-access-token': token.getToken() || ''
            };
            logger(`Http ${request.method} request to ${request.url}`, () => {
                let data = request.data;
                if (data) {
                    console.log(data);
                }
            });

            return request;
        },
        response: (response) => {
            clearTimeout(timeId);


            logger('Http response!', () => {
                console.log(response.data);
            });
            //траблы если передавать response.data
            return response;
        }
    };
}
