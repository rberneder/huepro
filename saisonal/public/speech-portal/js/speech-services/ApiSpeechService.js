'use strict'

class ApiSpeechService extends AbstractSpeechService {

    constructor($scope) {
        super('api.ai', $scope);
        this.apiUrl = '/speech-portal/query';
    }


    processCommands() {
        return new Promise((resolve, reject) => {
            var command = this.queryCommands.pop();

            if (command) {
                this.waitingForResponse = true;

                $.ajax({
                    method: 'POST',
                    url: this.apiUrl,
                    data: {
                        query: command
                    }

                }).done(msg => {
                    this.addChatCommand(command);
                    this.addChatResponse(msg.response.result.fulfillment.speech);
                    this.setJsonResponse(msg);

                    if (msg.data) {
                        var responseHTML = '';
                        for (var i = 0; i < msg.data.length; i++) {
                            responseHTML += msg.data[i];
                        }
                        this.setHtmlResponse(responseHTML);
                    } else {
                        this.setHtmlResponse('<i>&nbsp;nothing to show</i>');
                    }
                    resolve(msg);

                }).fail(err => {
                    this.addChatResponse('Error: ' + err);
                    reject(err);

                }).always(() => {
                    this.waitingForResponse = false;
                    this.processCommands();
                });
            }
        });
    }
}