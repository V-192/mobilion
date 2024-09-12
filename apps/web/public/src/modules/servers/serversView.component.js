import template from './serversView.template';

const serversView = {
  template: template(),
  controller: [
    'Server',
    '$stateParams',
    'NotificationService',
    'Charts',
    '$uibModal',
    function(Server, $stateParams, NotificationService, Charts, $uibModal) {
      this.server = Server.get({id: $stateParams.id});
      this.charts = Charts.serverCharts({serverId: $stateParams.id});
      this.showServerInfo = function() {
        $uibModal.open({
          component: 'showPayloadModal',
          size: 'lg',
          resolve: {
            payload: this.server,
          },
        }).result.catch(angular.noop);
      };
      this.start = function() {
        if (confirm('Вы хотите запустить сервер?')) {
          this.server.$start(function() {
            NotificationService.showSuccess('Сервер запущен');
          });
        }
      };
      this.stop = function() {
        if (confirm('Вы хотите остановить сервер?')) {
          this.server.$stop(function() {
            NotificationService.showSuccess('Сервер остановлен');
          });
        }
      };
      this.restart = function() {
        if (confirm('Вы хотите перезапустить сервер?')) {
          this.server.$restart(function() {
            NotificationService.showSuccess('Сервер перезагружается');
          });
        }
      };
    }],
};

export {serversView};
