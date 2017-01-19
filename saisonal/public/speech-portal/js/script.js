$(document).ready(function() {

    var $chatCommand = $('#src .msg.command'),
        $chatResponse = $('#src .msg.response'),
        $chat = $('#chat'),
        $textForm = $('#text-form'),
        $commandInput = $('#text-command', $textForm),
        $apiResponse = $('#api-response'),
        $saisonalResponse = $('#saisonal-response');


    function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br/>')
            .replace(/\s/g, '&nbsp;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    function setApiResponse(msg) {
        $apiResponse.html(syntaxHighlight(msg));
    }

    function scrollChat() {
        $chat.scrollTop($chat[0].scrollHeight);
    }

    function addChatCommand(command) {
        $chat.append($chatCommand.clone().text(command));
        scrollChat();
    }

    function addChatResponse(response) {
        $chat.append($chatResponse.clone().text(response));
        scrollChat();
    }

    function setSaisonalResponse(data) {
        $saisonalResponse.html(data);
    }


    $textForm.on('submit', function(e) {
        e.preventDefault();

        var command = $commandInput.val();
        $commandInput.val('');
        addChatCommand(command);


        $.ajax({
            method: 'POST',
            url: $textForm.attr('action'),
            data: {
                query: command
            }
        }).done(function (msg) {
            setApiResponse(msg);

            try {
                var responseTxt = msg.response.result.fulfillment.speech;
                addChatResponse(responseTxt);

                if (msg.data) {
                    var responseHTML = '';
                    for (var i = 0; i < msg.data.length; i++) {
                        responseHTML += msg.data[i];
                    }
                    setSaisonalResponse(responseHTML);
                } else {
                    setSaisonalResponse('');
                }

            } catch (e) {
                console.error(e);
            }

        });
    });
});