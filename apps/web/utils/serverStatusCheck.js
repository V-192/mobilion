const { Server, UserAction } = require('../../../models');
const moment = require('moment');

const serverStatusCheck = async (serverId) => {
    const timeout = 60 * 1000; // 60 сек
    const interval = 5000;  // 5 сек
    let timeElapsed = 0;
    
    return new Promise((resolve, reject) => {
      const checkStatus = async () => {
        const server = await Server.findOne({ _id: serverId });
        const ping = false;
        /*
            Тут мы пингуем сервер, ставим просто переменную для теста
        */
        if (ping) {
          server.status = 'started'
          await server.save();
          return resolve(server);
        }
        timeElapsed += interval;
        if (timeElapsed >= timeout) {
            await UserAction.create({
                serverId: serverId,
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                user: 'Тестовый пользователь',
                action: 'Пользователь перезагрузил сервер и он не запустился',
            });
            server.status = 'stoped';
            await server.save();
          return reject(new Error('restart timeout'));
        }
        setTimeout(checkStatus, interval);
      };
      checkStatus();
    });
};

module.exports = {
    serverStatusCheck,
}