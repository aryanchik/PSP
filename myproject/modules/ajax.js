class Ajax {

    async _request(url, options = {}) {
        try {
            const response = await fetch(url, options);
            // Если статус не 200-299, fetch не выбрасывает ошибку сам,
            // но мы можем проверить это вручную:
            if (!response.ok) {
                console.warn(`Сервер ответил со статусом ${response.status}`);
                return { data: null, status: response.status };
            }
            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            // Здесь ловится ERR_CONNECTION_REFUSED
            console.error('Сетевая ошибка или сервер недоступен:', error);
            return { data: null, status: 0 }; // 0 означает, что сервер не ответил
        }
    }

    async get(url) {
        return this._request(url, { method: 'GET' });
    }

    async post(url, data) {
        return this._request(url, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async patch(url, data) {
        return this._request(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async delete(url) {
        return this._request(url, { method: 'DELETE' });
    }
}

export const ajax = new Ajax();
